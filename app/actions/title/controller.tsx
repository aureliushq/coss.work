import { createController } from 'remix/router'

import { getCategory } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { notFound } from '../not-found-page.tsx'
import { TitlePage } from './page.tsx'

export default createController(routes.title, {
	actions: {
		async show(context) {
			let found = await getCategory(context.params.slug)

			if (found === undefined) {
				return notFound(context)
			}

			return context.render(
				<TitlePage category={found.category} companies={found.companies} />,
			)
		},
	},
})
