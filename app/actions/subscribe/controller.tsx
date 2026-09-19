import * as s from 'remix/data-schema'
import * as c from 'remix/data-schema/checks'
import * as f from 'remix/data-schema/form-data'
import { createController } from 'remix/router'

import { routes } from '../../routes.ts'

const subscribeFormSchema = f.object({
	email: f.field(s.string().pipe(c.email())),
	stack: f.field(s.defaulted(s.string(), 'any')),
})

export default createController(routes.subscribe, {
	actions: {
		async edit({ formData }) {
			const result = s.parseSafe(subscribeFormSchema, formData)

			if (!result.success) {
				return new Response('Invalid subscription', { status: 400 })
			}

			return Response.json(result.value)
		},
	},
})
