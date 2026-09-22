import { createController } from 'remix/router'

import { getTech } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { notFound } from '../not-found-page.tsx'
import { TechPage } from './page.tsx'

export default createController(routes.tech, {
	actions: {
		async show(context) {
			let tech = await getTech(context.params.slug)

			if (tech === undefined) {
				return notFound(context)
			}

			return context.render(
				<TechPage slug={context.params.slug} name={tech.name} companies={tech.companies} />,
			)
		},
	},
})
