import { readdir, readFile } from 'node:fs/promises'
import { basename } from 'node:path'

import positions from './positions.json' with { type: 'json' }
import tech from './tech.json' with { type: 'json' }

export type Job = {
	position: string
	category:
		| 'frontend'
		| 'backend'
		| 'full-stack'
		| 'mobile'
		| 'devops'
		| 'data'
		| 'security'
		| 'systems'
	level: 'any' | 'junior' | 'senior'
	type: 'full-time' | 'part-time' | 'contract' | 'freelance'
	salary?: {
		amount: [number, number]
		range: 'yearly' | 'monthly' | 'hourly'
		currency: 'usd' | 'eur'
	}
	equity?: [number, number]
	tech: string[]
	url: string
}

export type Company = {
	// Derived from the file name: `companies/<first letter>/<slug>.json`.
	slug: string
	name: string
	url: string
	at: string
	building: string
	products: { name: string; url: string }[]
	socials: string[]
	offices: string[]
	headcount: number
	founded: number
	jobs: Job[]
	updated: string
}

export const REPO_URL = 'https://github.com/aureliushq/coss.work'

let techNames: Record<string, string> = tech
let positionNames: Record<string, string> = positions
let categoryNames: Record<Job['category'], string> = {
	'frontend': 'Frontend',
	'backend': 'Backend',
	'full-stack': 'Full-Stack',
	'mobile': 'Mobile',
	'devops': 'DevOps',
	'data': 'Data',
	'security': 'Security',
	'systems': 'Systems',
}

let companiesDir = new URL('./companies/', import.meta.url)
let files = (await readdir(companiesDir, { recursive: true })).filter((file) =>
	file.endsWith('.json'),
)

let companies: Company[] = await Promise.all(
	files.map(async (file) => ({
		...JSON.parse(await readFile(new URL(file, companiesDir), 'utf8')),
		slug: basename(file, '.json'),
	})),
)
companies.sort((a, b) => b.updated.localeCompare(a.updated))

// Unique tech names across all of a company's jobs.
export function stackFor(company: Company) {
	return [...new Set(company.jobs.flatMap(jobStack))]
}

export function jobStack(job: Job) {
	return job.tech.map((id) => techNames[id] ?? id)
}

export function positionName(id: string) {
	return positionNames[id] ?? id
}

export function categoryName(id: Job['category']) {
	return categoryNames[id]
}

const LEVEL_PREFIX: Record<Job['level'], string> = { any: '', junior: 'Jr ', senior: 'Sr ' }

export function jobTitle(job: Job) {
	return LEVEL_PREFIX[job.level] + positionName(job.position)
}

// Office ids are slugs (`san-francisco`); there is no locations.json to look them up in yet.
export function officeName(id: string) {
	return id.replace(
		/(^|-)(\w)/g,
		(_, dash: string, char: string) => (dash ? ' ' : '') + char.toUpperCase(),
	)
}

export function editUrl(company: Company) {
	return `${REPO_URL}/blob/main/app/data/companies/${company.slug.charAt(0)}/${company.slug}.json`
}

export async function listCompanies(query: string) {
	let needle = query.trim().toLowerCase()
	if (needle === '') return companies

	return companies.filter(
		(company) =>
			company.name.toLowerCase().includes(needle) ||
			stackFor(company).some((tech) => tech.toLowerCase().includes(needle)),
	)
}

export async function getCompany(slug: string) {
	return companies.find((company) => company.slug === slug)
}

const ACTIVITY_POINTS = 24

// Deterministic placeholder activity so each company keeps the same sparkline across renders.
export function activityFor(slug: string): number[] {
	let seed = 0
	for (let char of slug) seed = (Math.imul(seed, 31) + char.charCodeAt(0)) | 0

	let values: number[] = []
	for (let i = 0; i < ACTIVITY_POINTS; i++) {
		seed = (seed + 0x6d2b79f5) | 0
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		values.push(((t ^ (t >>> 14)) >>> 0) / 4294967296)
	}
	return values
}
