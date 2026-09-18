import { formData } from 'remix/middleware/form-data'
import { render } from 'remix/middleware/render'
import { staticFiles } from 'remix/middleware/static'
import { createRouter, type MiddlewareContext } from 'remix/router'

import companiesController from './actions/companies/controller.tsx'
import companiesEditController from './actions/companies/edit/controller.tsx'
import controller from './actions/controller.tsx'
import subscribeController from './actions/subscribe/controller.tsx'
import { assets } from './assets.ts'
import { routes } from './routes.ts'

const formDataMiddleware = formData()
const renderMiddleware = render({ assets })
type AppContext = MiddlewareContext<[typeof formDataMiddleware, typeof renderMiddleware]>

declare module 'remix/router' {
	interface RouterTypes {
		context: AppContext
	}
}

export const router = createRouter<AppContext>({
	middleware: [staticFiles('./public', { index: false }), formDataMiddleware, renderMiddleware],
})

router.map(routes, controller)
router.map(routes.companies, companiesController)
router.map(routes.companies.edit, companiesEditController)
router.map(routes.subscribe, subscribeController)
