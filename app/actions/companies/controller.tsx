import { createController } from 'remix/router'

import { getCompany } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { CompanyPage } from './show-page.tsx'

export default createController(routes.companies, {
	actions: {
		async show(context) {
			let company = await getCompany(context.params.slug)

			if (company === undefined) {
				return new Response('Company not found', { status: 404 })
			}

			return context.render(<CompanyPage company={company} />)
		},
	},
})
