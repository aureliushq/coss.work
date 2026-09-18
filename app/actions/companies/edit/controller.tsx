import * as s from 'remix/data-schema'
import * as f from 'remix/data-schema/form-data'
import { redirect } from 'remix/response/redirect'
import { createController } from 'remix/router'

import { getCompany, updateCompany } from '../../../data/companies.ts'
import { routes } from '../../../routes.ts'
import { CompanyEditPage } from './page.tsx'

const companyFormSchema = f.object({
	name: f.field(s.string()),
	github: f.field(s.string()),
	website: f.field(s.string()),
})

export default createController(routes.companies.edit, {
	actions: {
		async index(context) {
			let company = await getCompany(context.params.slug)

			if (company === undefined) {
				return new Response('Company not found', { status: 404 })
			}

			return context.render(<CompanyEditPage company={company} />)
		},
		async action({ formData, params }) {
			const result = s.parseSafe(companyFormSchema, formData)

			if (!result.success) {
				return new Response('Invalid company data', { status: 400 })
			}

			const company = await updateCompany(params.slug, result.value)

			if (company === undefined) {
				return new Response('Company not found', { status: 404 })
			}
			return redirect(routes.companies.show.href({ slug: params.slug }), 303)
		},
	},
})
