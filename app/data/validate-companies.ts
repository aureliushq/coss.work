// Checks every company file against company.schema.json and the tech/position ids.
// In GitHub Actions, errors are printed as annotations so they show on the PR diff.
import { readdir, readFile } from 'node:fs/promises'
import { basename, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Ajv, type ErrorObject } from 'ajv'
import addFormats from 'ajv-formats'
import {
	findNodeAtLocation,
	getNodeValue,
	parseTree,
	printParseErrorCode,
	type ParseError,
} from 'jsonc-parser'

import schema from './company.schema.json' with { type: 'json' }
import locations from './locations.json' with { type: 'json' }
import positions from './positions.json' with { type: 'json' }
import tech from './tech.json' with { type: 'json' }

let validate = addFormats.default(new Ajv({ allErrors: true })).compile(schema)
let companiesDir = fileURLToPath(new URL('./companies/', import.meta.url))
// The directory only exists once someone has added a company, so a missing one is not an error.
let entries = await readdir(companiesDir, { recursive: true }).catch(
	(error: NodeJS.ErrnoException) => {
		if (error.code === 'ENOENT') return []
		throw error
	},
)
let files = entries.filter((file) => file.endsWith('.json'))
let errorCount = 0

for (let file of files) {
	let path = relative(process.cwd(), companiesDir + file)
	let text = await readFile(companiesDir + file, 'utf8')

	function report(offset: number, message: string) {
		let line = text.slice(0, offset).split('\n').length
		let column = offset - text.lastIndexOf('\n', offset - 1)
		if (process.env.GITHUB_ACTIONS) {
			console.log(`::error file=${path},line=${line},col=${column}::${message}`)
		} else {
			console.error(`${path}:${line}:${column} ${message}`)
		}
		errorCount++
	}

	let name = basename(file)
	if (!/^[a-z0-9-]+\.json$/.test(name)) {
		report(0, 'file name must use lowercase letters, digits and dashes only')
	} else if (dirname(file) !== name.charAt(0)) {
		report(0, `file must be in app/data/companies/${name.charAt(0)}/`)
	}

	let parseErrors: ParseError[] = []
	let tree = parseTree(text, parseErrors, { allowTrailingComma: false, disallowComments: true })
	// Later parse errors are usually caused by the first one, so only report that.
	let [parseError] = parseErrors
	if (parseError !== undefined) {
		report(parseError.offset, `invalid JSON: ${printParseErrorCode(parseError.error)}`)
		continue
	}
	if (tree === undefined) continue

	let offsetOf = (path: (string | number)[]) => findNodeAtLocation(tree, path)?.offset ?? 0

	let company = getNodeValue(tree)
	if (!validate(company)) {
		for (let error of validate.errors ?? []) {
			let path = error.instancePath
				.split('/')
				.slice(1)
				.map((key) => (/^\d+$/.test(key) ? Number(key) : key))
			if (error.keyword === 'additionalProperties') {
				path.push(error.params.additionalProperty)
			}
			report(offsetOf(path), describe(error, path))
		}
	}

	// Checked even when the schema fails, so contributors see every error in one run.
	let offices: unknown[] = Array.isArray(company?.offices) ? company.offices : []
	offices.forEach((id, i) => {
		// `remote` is a sentinel office id, not a location.
		if (typeof id === 'string' && id !== 'remote' && !Object.hasOwn(locations, id)) {
			report(
				offsetOf(['offices', i]),
				`offices.${i}: unknown id "${id}", see app/data/locations.json`,
			)
		}
	})

	let jobs: unknown[] = Array.isArray(company?.jobs) ? company.jobs : []
	// Job page slugs are [level-]position[-team]-at-company, so one company cannot list the same
	// level, position and team twice. Mirrors jobSlug in companies.ts, which can't be imported here.
	let seenSlugs = new Map<string, number>()
	jobs.forEach((job: any, i) => {
		if (typeof job?.position === 'string') {
			if (!Object.hasOwn(positions, job.position)) {
				report(
					offsetOf(['jobs', i, 'position']),
					`jobs.${i}.position: unknown id "${job.position}", see app/data/positions.json`,
				)
			}
			let slug = job.level === 'any' ? job.position : `${job.level}-${job.position}`
			if (typeof job.team === 'string') {
				slug += `-${job.team
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')
					.replace(/^-|-$/g, '')}`
			}
			let first = seenSlugs.get(slug)
			if (first === undefined) {
				seenSlugs.set(slug, i)
			} else {
				report(
					offsetOf(['jobs', i, 'position']),
					`jobs.${i}.position: job slug "${slug}" is already used by jobs.${first}`,
				)
			}
		}
		let ids: unknown[] = Array.isArray(job?.tech) ? job.tech : []
		ids.forEach((id, j) => {
			if (typeof id === 'string' && !Object.hasOwn(tech, id)) {
				report(
					offsetOf(['jobs', i, 'tech', j]),
					`jobs.${i}.tech.${j}: unknown id "${id}", see app/data/tech.json`,
				)
			}
		})
	})
}

function describe(error: ErrorObject, path: (string | number)[]) {
	let where = path.join('.') || 'file'
	if (error.keyword === 'additionalProperties') return `${where}: unknown property`
	if (error.keyword === 'enum') {
		return `${where}: must be one of ${error.params.allowedValues.join(', ')}`
	}
	return `${where}: ${error.message}`
}

if (errorCount > 0) {
	console.error(`${errorCount} error(s) in company files`)
	process.exitCode = 1
} else {
	console.log(`${files.length} company files OK`)
}
