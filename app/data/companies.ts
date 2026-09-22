import { basename } from 'node:path'

import locations from './locations.json' with { type: 'json' }
import positions from './positions.json' with { type: 'json' }
import tech from './tech.json' with { type: 'json' }

export type Job = {
	position: string
	// Tells apart jobs with the same position and level, e.g. "Scrape" in "Product Engineer, Scrape".
	team?: string
	category:
		| 'frontend'
		| 'backend'
		| 'full-stack'
		| 'mobile'
		| 'devops'
		| 'data'
		| 'security'
		| 'systems'
	level: 'any' | 'junior' | 'senior' | 'staff'
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
	headcount?: number
	founded?: number
	jobs: Job[]
	updated: string
}

export const REPO_URL = 'https://github.com/aureliushq/coss.work'

let techNames: Record<string, string> = tech
let positionNames: Record<string, string> = positions
let locationsById: Record<string, Location> = locations
// Display name and the explainer paragraph on each category's own page.
let categories: Record<Job['category'], { name: string; description: string }> = {
	'frontend': {
		name: 'Frontend',
		description:
			'Frontend jobs cover the part of a product people actually see and use. Frontend engineers build interfaces from components, markup and styles, keep them fast on slow networks and old devices, and make them work with a keyboard and a screen reader. The work runs from design systems and state management to bundle size, rendering performance and browser bugs.',
	},
	'backend': {
		name: 'Backend',
		description:
			'Backend jobs cover the server side of a product: the APIs, the business rules and the data underneath them. Backend engineers design schemas, write queries that stay fast as tables grow, and handle queues, caching and background work. Much of the job is keeping a service correct and available while it is being changed.',
	},
	'full-stack': {
		name: 'Full-Stack',
		description:
			'Full-stack jobs span both ends of a web application. Full-stack engineers own a feature from the interface down to the schema, which means moving between a component tree, an API and a database in the same day. These roles suit engineers who would rather ship a whole change than hand it across a team boundary.',
	},
	'mobile': {
		name: 'Mobile',
		description:
			'Mobile jobs cover apps that ship to a phone or tablet, native or cross-platform. Mobile engineers work within the constraints the platform sets: battery, offline use, background limits and an app store review between them and their users. Older releases stay in the wild, so compatibility and migrations matter more than on the web.',
	},
	'devops': {
		name: 'DevOps',
		description:
			'DevOps jobs cover how software is built, shipped and run. DevOps engineers own the pipelines, the infrastructure that runs the product, and the monitoring that says whether it is healthy. The work is mostly automation: making a deploy boring, a rollback quick, and a failure something that pages the right person with the right context.',
	},
	'data': {
		name: 'Data',
		description:
			'Data jobs cover moving data from where it is produced to where it is useful. Data engineers build pipelines, model warehouses and keep the numbers trustworthy as sources change underneath them. The work ranges from batch and streaming ingestion to the tests and lineage that let everyone else rely on the result.',
	},
	'security': {
		name: 'Security',
		description:
			'Security jobs cover keeping a product and its users safe from people trying to break in. Security engineers review designs and code for weaknesses, build the authentication, secrets and audit machinery, and respond when something goes wrong. Open-source work adds a public dimension: reports arrive from strangers, and fixes ship in the open.',
	},
	'systems': {
		name: 'Systems',
		description:
			'Systems jobs cover the layers other software is built on: runtimes, databases, compilers, kernels and networking. Systems engineers work close to the machine, where memory, concurrency and latency are the problem rather than a detail. Correctness is expensive to get wrong here, so the work leans on careful design, benchmarks and tests.',
	},
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
	return categories[id].name
}

export function categoryDescription(id: Job['category']) {
	return categories[id].description
}

const LEVEL_PREFIX: Record<Job['level'], string> = {
	any: '',
	junior: 'Jr ',
	senior: 'Sr ',
	staff: 'Staff ',
}

export function jobTitle(job: Job) {
	let title = LEVEL_PREFIX[job.level] + positionName(job.position)
	return job.team === undefined ? title : `${title}, ${job.team}`
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

const RANGE_SUFFIX: Record<NonNullable<Job['salary']>['range'], string> = {
	yearly: '/yr',
	monthly: '/mo',
	hourly: '/hr',
}

// "$200k-370k/yr USD".
export function salaryRange(salary: NonNullable<Job['salary']>) {
	// INR uses lakh and crore ("₹40L–1Cr"), written as Indian companies post them.
	let indian = salary.currency === 'inr'
	let compact = new Intl.NumberFormat(indian ? 'en-IN' : 'en', { notation: 'compact' })
	let [min, max] = salary.amount.map((amount) => {
		let value = compact.format(amount)
		return indian ? value : value.toLowerCase()
	})

	return `${currencySymbol(salary)}${min}\u2013${max}${RANGE_SUFFIX[salary.range]} ${salary.currency.toUpperCase()}`
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

// Shown until enough companies are listed to rank stacks by themselves.
const DEFAULT_STACKS = ['rust', 'go', 'typescript', 'python', 'kubernetes']

// Tech names used by the most companies, for one-click searches. Topped up from the defaults
// so the line is never empty or near-empty while the board is still filling up.
export function popularStacks(limit: number) {
	let counts = new Map<string, number>()
	for (let company of companies) {
		for (let tech of stackFor(company).map(techName))
			counts.set(tech, (counts.get(tech) ?? 0) + 1)
	}

	let ranked = [...counts]
		.sort(([a, x], [b, y]) => y - x || a.localeCompare(b))
		.map(([tech]) => tech)

	for (let id of DEFAULT_STACKS.map(techName)) {
		if (ranked.length >= limit) break
		if (!ranked.includes(id)) ranked.push(id)
	}

	return ranked.slice(0, limit)
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

// "frontend-engineer-at-gradle", "senior-frontend-engineer-at-gradle",
// "product-engineer-scrape-at-firecrawl". `any` adds no level.
// The validator keeps these unique within a company.
export function jobSlug(company: Company, job: Job) {
	let prefix = job.level === 'any' ? '' : `${job.level}-`
	let team = job.team === undefined ? '' : `-${slugify(job.team)}`
	return `${prefix}${job.position}${team}-at-${company.slug}`
}

// "Infra/Systems" → "infra-systems".
function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

export async function getJob(slug: string) {
	for (let company of companies) {
		let job = company.jobs.find((job) => jobSlug(company, job) === slug)
		if (job !== undefined) return { company, job }
	}

	return undefined
}

// Companies hiring in a category, trimmed to the jobs in it.
export async function getCategory(slug: string) {
	if (!Object.hasOwn(categories, slug)) return undefined
	let category = slug as Job['category']

	let hiring = companies.flatMap((company) => {
		let jobs = company.jobs.filter((job) => job.category === category)
		return jobs.length > 0 ? [{ ...company, jobs }] : []
	})

	return { category, companies: hiring }
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
