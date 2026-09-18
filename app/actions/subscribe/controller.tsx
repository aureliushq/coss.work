import * as s from 'remix/data-schema'
import * as c from 'remix/data-schema/checks'
import * as f from 'remix/data-schema/form-data'
import { createController } from 'remix/router'

import { routes } from '../../routes.ts'

const subscribeFormSchema = f.object({
	name: f.field(s.string()),
	email: f.field(s.string().pipe(c.email())),
})

export default createController(routes.subscribe, {
	actions: {
		async edit({ formData }) {
			const result = s.parseSafe(subscribeFormSchema, formData)

			if (!result.success) {
				return new Response('Invalid company data', { status: 400 })
			}
			const email = result.value.email
			const name = result.value.name

			console.log(name)
			console.log(email)

			return Response.json({ name, email })
		},
	},
})
