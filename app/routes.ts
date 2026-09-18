import { form, get, post, route } from 'remix/routes'

export const routes = route({
	assets: get('/assets/*path'),
	home: '/',
	companies: {
		show: get('/companies/:slug'),
		edit: form('/companies/:slug/edit'),
	},
	job: {
		show: get('/jobs/:slug'),
	},
	subscribe: {
		edit: post('/subscribe'),
	},
	tech: {
		show: get('/tech/:slug'),
	},
	title: {
		show: get('/title/:slug'),
	},
})
