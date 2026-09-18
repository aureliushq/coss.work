import * as s from 'remix/data-schema'
import * as f from 'remix/data-schema/form-data'
import { createController } from 'remix/router'

import { assets } from '../assets.ts'
import { listCompanies } from '../data/companies.ts'
import { routes } from '../routes.ts'
import { HomePage } from './home-page.tsx'

const homeSearchSchema = f.object({
	q: f.field(s.defaulted(s.string(), '')),
})

export default createController(routes, {
	actions: {
		async assets(context) {
			return (
				(await assets.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
			)
		},
		async home(context) {
			let { q } = s.parse(homeSearchSchema, context.url.searchParams)
			let companies = await listCompanies(q)

			return context.render(<HomePage companies={companies} query={q} />)
		},
	},
})
