import { basename } from 'node:path'

import locations from './locations.json' with { type: 'json' }
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
		currency: 'usd' | 'eur' | 'gbp' | 'cad' | 'aud' | 'chf' | 'inr'
	}
	equity?: [number, number]
	tech: string[]
	url: string
}

// A city a company has an office in. `remote` is a sentinel office id, not a location.
export type Location = {
	name: string
	region?: string
	country: string
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
let locationsById: Record<string, Location> = locations
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

// Bundled at build time: Workers has no project filesystem to read these from at runtime.
let files = import.meta.glob<Omit<Company, 'slug'>>('./companies/**/*.json', {
	eager: true,
	import: 'default',
})

let companies: Company[] = Object.entries(files).map(([file, company]) => ({
	...company,
	slug: basename(file, '.json'),
}))
companies.sort((a, b) => b.updated.localeCompare(a.updated))

// Unique tech ids across all of a company's jobs.
export function stackFor(company: Company) {
	return [...new Set(company.jobs.flatMap((job) => job.tech))]
}

export function techName(id: string) {
	return techNames[id] ?? id
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

// `$`, `€`, `£`, `CA$`, `A$`, `CHF`, `₹`.
export function currencySymbol(salary: NonNullable<Job['salary']>) {
	return new Intl.NumberFormat('en', { style: 'currency', currency: salary.currency })
		.formatToParts(0)
		.find((part) => part.type === 'currency')!.value
}

// Office ids come from locations.json. Callers drop `remote` first; it has no entry there.
export function officeName(id: string) {
	return locationsById[id]?.name ?? id
}

export function editUrl(company: Company) {
	return `${REPO_URL}/blob/main/app/data/companies/${company.slug.charAt(0)}/${company.slug}.json`
}

export async function listCompanies(query: string) {
	let needle = query.trim().toLowerCase()
	if (needle === '') return companies

	// A known tech name matches exactly, so "go" doesn't pull in Django, Google Cloud or Nango.
	let exact = Object.values(techNames).some((name) => name.toLowerCase() === needle)
	let matches = (value: string) =>
		exact ? value.toLowerCase() === needle : value.toLowerCase().includes(needle)

	return companies.filter(
		(company) => matches(company.name) || stackFor(company).map(techName).some(matches),
	)
}

// Tech names used by the most companies, for one-click searches.
export function popularStacks(limit: number) {
	let counts = new Map<string, number>()
	for (let company of companies) {
		for (let tech of stackFor(company).map(techName))
			counts.set(tech, (counts.get(tech) ?? 0) + 1)
	}
	return [...counts]
		.sort(([a, x], [b, y]) => y - x || a.localeCompare(b))
		.slice(0, limit)
		.map(([tech]) => tech)
}

export async function getCompany(slug: string) {
	return companies.find((company) => company.slug === slug)
}

// Companies hiring for a tech, trimmed to the jobs that use it, with that tech listed first.
export async function getTech(slug: string) {
	let name = techNames[slug]
	if (name === undefined) return undefined

	let hiring = companies.flatMap((company) => {
		let jobs = company.jobs
			.filter((job) => job.tech.includes(slug))
			.map((job) => ({ ...job, tech: [slug, ...job.tech.filter((id) => id !== slug)] }))
		return jobs.length > 0 ? [{ ...company, jobs }] : []
	})

	return { name, companies: hiring }
}

// Companies with an office in a location. `offices` is company-level, so every job counts.
export async function getLocation(slug: string) {
	let location = locationsById[slug]
	if (location === undefined) return undefined

	return { location, companies: companies.filter((company) => company.offices.includes(slug)) }
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
