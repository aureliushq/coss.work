import * as s from 'remix/data-schema'
import * as f from 'remix/data-schema/form-data'
import { createController } from 'remix/router'

import { jobSlug, listCompanies, popularStacks, stackFor } from '../data/companies.ts'
import { routes } from '../routes.ts'
import { SITE_URL } from './document.tsx'
import { HomePage } from './home-page.tsx'

const homeSearchSchema = f.object({
	q: f.field(s.defaulted(s.string(), '')),
})

export default createController(routes, {
	actions: {
		async home(context) {
			let q = s.parse(homeSearchSchema, context.url.searchParams).q.trim()
			let companies = await listCompanies(q)

			return context.render(
				<HomePage companies={companies} query={q} stacks={popularStacks(5)} />,
			)
		},

		// Every indexable page. Listing pages only appear once a company is hiring for them.
		async sitemap() {
			let companies = await listCompanies('')
			let paths = [routes.home.href()]
			let techs = new Set<string>()
			let titles = new Set<string>()
			let locations = new Set<string>()

			for (let company of companies) {
				paths.push(routes.companies.show.href({ slug: company.slug }))
				for (let job of company.jobs) {
					paths.push(routes.job.show.href({ slug: jobSlug(company, job) }))
					titles.add(job.category)
				}
				for (let id of stackFor(company)) techs.add(id)
				for (let id of company.offices) if (id !== 'remote') locations.add(id)
			}

			for (let slug of techs) paths.push(routes.tech.show.href({ slug }))
			for (let slug of titles) paths.push(routes.title.show.href({ slug }))
			for (let slug of locations) paths.push(routes.location.show.href({ slug }))

			let urls = paths.map((path) => `<url><loc>${new URL(path, SITE_URL).href}</loc></url>`)
			let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`

			return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
		},
	},
})
