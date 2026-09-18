export type Company = {
	name: string
	slug: string
	github: string
	website: string
}

let companies: Company[] = [
	{
		name: 'Temporal',
		slug: 'temporal',
		github: 'https://github.com/temporalio/temporal',
		website: 'https://temporal.io',
	},
]

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
