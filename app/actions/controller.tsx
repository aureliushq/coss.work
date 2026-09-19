import * as s from 'remix/data-schema'
import * as f from 'remix/data-schema/form-data'
import { createController } from 'remix/router'

import { listCompanies, popularStacks } from '../data/companies.ts'
import { routes } from '../routes.ts'
import { HomePage } from './home-page.tsx'

const homeSearchSchema = f.object({
	q: f.field(s.defaulted(s.string(), '')),
})

export default createController(routes, {
	actions: {
		async home(context) {
			let q = s.parse(homeSearchSchema, context.url.searchParams).q.trim()
			let companies = await listCompanies(q)

			return context.render(
				<HomePage companies={companies} query={q} stacks={popularStacks(5)} />,
			)
		},
	},
})
