import { readdir, readFile } from 'node:fs/promises'
import { basename } from 'node:path'

import positions from './positions.json' with { type: 'json' }
import tech from './tech.json' with { type: 'json' }

export type Job = {
	position: string
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

let techNames: Record<string, string> = tech
let positionNames: Record<string, string> = positions

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
	let ids = new Set(company.jobs.flatMap((job) => job.tech))
	return [...ids].map((id) => techNames[id] ?? id)
}

export function positionName(id: string) {
	return positionNames[id] ?? id
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
