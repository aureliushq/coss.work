export type Company = {
	name: string
	slug: string
	github?: string
	website?: string
	stack: string[]
	role: string
	salaryListed: boolean
	extraRoles: number
}

type Hiring = { salary?: boolean; extra?: number }

function listing(name: string, stack: string[], role: string, hiring: Hiring = {}): Company {
	return {
		name,
		slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
		stack,
		role,
		salaryListed: hiring.salary ?? false,
		extraRoles: hiring.extra ?? 0,
	}
}

let companies: Company[] = [
	listing('Continue', ['Python', 'TypeScript'], 'Founding Engineer', { salary: true }),
	listing('Instill AI', ['GCP', 'Docker', 'Go', 'Python'], 'Sr Backend Dev', { salary: true }),
	listing('Outline', ['JS'], 'Sr JavaScript Dev'),
	listing('Metabase', ['TypeScript', 'JS', 'Clojure'], 'Backend Engineer', { extra: 1 }),
	listing('Formance', ['Go'], 'Compiler Engineer'),
	listing('Baserow', ['Python', 'Docker', 'Vue'], 'Sr Full-Stack Dev', { salary: true }),
	listing('Roboflow', ['Python', 'Docker', 'PyTorch'], 'Software Engineer', { salary: true }),
	listing('Windmill Labs', ['Rust', 'Python', 'Svelte'], 'Rust Engineer', { salary: true }),
	listing('Chatwoot', ['Ruby', 'Vue'], 'Ruby Engineer'),
	listing('Cal.com', ['TypeScript', 'AWS', 'Next.js'], 'Sr Full-Stack Dev', { salary: true }),
	listing('Lago', ['Ruby'], 'Sr Ruby Engineer', { salary: true }),
	listing('Textile', ['TypeScript', 'Rust', 'Go'], 'Protocol Engineer'),
	listing('Offchain Labs', ['Rust', 'Ethereum'], 'Rust Engineer'),
	listing('Canonical', ['Python', 'Go'], 'Software Engineer'),
	listing('Uniswap Labs', ['Solidity', 'TypeScript'], 'Sr Smart Contract Dev', { salary: true }),
	listing('Rotki', ['Python', 'Ethereum'], 'Python Engineer'),
	listing('QuestDB', ['C', 'Java', 'C++'], 'Core Engineer'),
	listing('Oven', ['C', 'C++', 'Zig'], 'Runtime Engineer'),
	listing('OneUptime', ['Postgres', 'TypeScript'], 'Sr Software Dev', { salary: true, extra: 2 }),
	listing('Coder', ['C', 'C++', 'Go'], 'Sr Software Dev', { salary: true }),
	listing('Pulumi', ['K8s', 'Go', 'AWS', 'TypeScript'], 'Principal Engineer', { salary: true }),
	listing('Signal', ['Java'], 'Android Engineer', { salary: true }),
	listing('Airbyte', ['Python', 'Java', 'K8s'], 'Sr Software Dev', { salary: true }),
	listing('Lightning Labs', ['C', 'Java', 'C++', 'Go'], 'Sr Security Dev'),
	listing('dYdX', ['TypeScript', 'JS', 'Solidity'], 'Staff Engineer', { salary: true }),
	listing('Carto', ['TypeScript', 'Postgres'], 'Sr Backend Dev'),
	listing('Gradle', ['JS', 'React'], 'Sr Frontend Dev'),
	listing('Clickhouse', ['Python', 'C', 'C++', 'Go'], 'Sr Cloud Software Dev', {
		salary: true,
		extra: 1,
	}),
	listing('OP Labs', ['Ethereum', 'K8s', 'Go'], 'Sr Protocol Dev'),
	listing('ClearML', ['Python', 'K8s', 'AWS', 'Docker'], 'DevOps Engineer', { extra: 1 }),
	listing('Svix', ['TypeScript', 'Rust'], 'Frontend Engineer', { salary: true, extra: 1 }),
	listing('Nango', ['TypeScript', 'JS', 'Node.js'], 'Sr Backend Dev'),
	listing('Automattic', ['Node.js', 'K8s', 'PHP'], 'Sr SysAdmin'),
	listing('Upbound', ['K8s', 'Go'], 'Sr Software Dev'),
	listing('Anyscale', ['Python', 'C++', 'K8s'], 'Software Engineer', { salary: true }),
	listing('Genie', ['K8s', 'Pulumi', 'AWS'], 'DevOps Engineer', { salary: true }),
	listing('Flow', ['Python', 'C', 'C++', 'Go'], 'Sr Compiler Dev'),
	listing('Heroic Labs', ['C', 'C++', 'Go'], 'Software Engineer'),
	listing('Medplum', ['TypeScript', 'React'], 'Full-Stack Dev'),
	listing('Bluesky', ['TypeScript', 'JS', 'Go'], 'TypeScript Dev'),
	listing('CloudQuery', ['Postgres', 'Go', 'AWS'], 'Sr Software Dev'),
	listing('Massa Labs', ['Ethereum', 'Rust', 'TypeScript'], 'Sr Blockchain Dev'),
	listing('Nebuly', ['Python', 'K8s', 'AWS', 'PyTorch'], 'Backend Engineer'),
	listing('Zama', ['Ethereum', 'Go'], 'Blockchain Sec Dev'),
	listing('Comma', ['Python', 'C', 'C++', 'Rust'], 'Sr Software Dev'),
	listing('Foxglove', ['Python', 'C++', 'TypeScript'], 'Lead Solutions Dev', { salary: true }),
	listing('CrowdSec', ['Python', 'Kafka', 'Go'], 'Sr Data Engineer'),
	listing('BoxyHQ', ['JS', 'Go'], 'Sr Software Dev'),
	listing('Lightdash', ['TypeScript', 'Postgres'], 'Sr Full-Stack Dev', { salary: true }),
	listing('Arduino', ['C++', 'Go', 'AWS'], 'Sr Backend Dev'),
	{
		...listing('Temporal', ['Go', 'TypeScript'], 'Sr Software Engineer'),
		github: 'https://github.com/temporalio/temporal',
		website: 'https://temporal.io',
	},
]

export async function listCompanies(query: string) {
	let needle = query.trim().toLowerCase()
	if (needle === '') return companies

	return companies.filter(
		(company) =>
			company.name.toLowerCase().includes(needle) ||
			company.stack.some((tech) => tech.toLowerCase().includes(needle)),
	)
}

export async function getCompany(slug: string) {
	return companies.find((company) => company.slug === slug)
}
export async function updateCompany(slug: string, values: Partial<Company>) {
	let company = companies.find((company) => company.slug === slug)

	if (company === undefined) {
		return undefined
	}

	Object.assign(company, values)
	return company
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
