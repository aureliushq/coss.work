import { createController } from 'remix/router'

import { getLocation } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { notFound } from '../not-found-page.tsx'
import { LocationPage } from './page.tsx'

export default createController(routes.location, {
	actions: {
		async show(context) {
			let found = await getLocation(context.params.slug)

			if (found === undefined) {
				return notFound(context)
			}

			return context.render(
				<LocationPage
					slug={context.params.slug}
					location={found.location}
					companies={found.companies}
				/>,
			)
		},
	},
})
