import { createController } from 'remix/router'

import { getCompany } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { notFound } from '../not-found-page.tsx'
import { CompanyPage } from './page.tsx'

export default createController(routes.companies, {
	actions: {
		async show(context) {
			let company = await getCompany(context.params.slug)

			if (company === undefined) {
				return notFound(context)
			}

			return context.render(<CompanyPage company={company} />)
		},
	},
})
