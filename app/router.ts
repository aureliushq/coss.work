import { formData } from 'remix/middleware/form-data'
import { render } from 'remix/middleware/render'
import { createRouter, type MiddlewareContext } from 'remix/router'

import companiesController from './actions/companies/controller.tsx'
import controller from './actions/controller.tsx'
import locationController from './actions/location/controller.tsx'
import { notFound } from './actions/not-found-page.tsx'
import subscribeController from './actions/subscribe/controller.tsx'
import techController from './actions/tech/controller.tsx'
import { routes } from './routes.ts'

const formDataMiddleware = formData()
const renderMiddleware = render()
type AppContext = MiddlewareContext<[typeof formDataMiddleware, typeof renderMiddleware]>

declare module 'remix/router' {
	interface RouterTypes {
		context: AppContext
	}
}

export const router = createRouter<AppContext>({
	defaultHandler: notFound,
	middleware: [formDataMiddleware, renderMiddleware],
})

router.map(routes, controller)
router.map(routes.companies, companiesController)
router.map(routes.location, locationController)
router.map(routes.subscribe, subscribeController)
router.map(routes.tech, techController)

// The Worker's fetch handler. Public files are served as Workers static assets before it runs.
export default router
