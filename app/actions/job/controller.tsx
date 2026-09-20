import { createController } from 'remix/router'

import { getJob } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { notFound } from '../not-found-page.tsx'
import { JobPage } from './page.tsx'

export default createController(routes.job, {
	actions: {
		async show(context) {
			let found = await getJob(context.params.slug)

			if (found === undefined) {
				return notFound(context)
			}

			return context.render(<JobPage company={found.company} job={found.job} />)
		},
	},
})
