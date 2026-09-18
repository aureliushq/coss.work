import { css, type Handle } from 'remix/ui'

import { routes } from '../../routes.ts'
import { Document } from '../document.tsx'
import { SubscribeForm } from '../subscribe/public/subscribe-form.tsx'
import type { Company } from './data.ts'

export function CompanyPage(handle: Handle<{ company: Company }>) {
	return () => {
		const { company } = handle.props
		return (
			<Document title={`${company.name} Jobs`}>
				<main
					mix={css({
						maxWidth: '44rem',
						margin: '0 auto',
						padding: '4rem 1.5rem',
					})}
				>
					<h1>{company.name}</h1>
					<p mix={css({ color: '#666' })}>
						{company.github} &middot; {company.website}
					</p>
					<a href={routes.companies.edit.index.href({ slug: company.slug })}>Edit</a>
					<SubscribeForm />
				</main>
			</Document>
		)
	}
}
