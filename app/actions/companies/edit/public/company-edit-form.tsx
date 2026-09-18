import { clientEntry, css, on, type Handle } from 'remix/ui'

import type { Company } from '../../../../data/companies.ts'
import { routes } from '../../../../routes.ts'

export const CompanyEditForm = clientEntry(
	import.meta.url,
	function CompanyEditForm(handle: Handle<{ company: Company }>) {
		return () => {
			const { company } = handle.props
			let pending = false

			return (
				<form
					action={routes.companies.edit.action.href({ slug: company.slug })}
					method='post'
					mix={[
						css({
							'display': 'grid',
							'gap': '0.75rem',
							'maxWidth': 'fit-content',
							'& input': { marginLeft: '0.5rem' },
						}),
						on('submit', () => {
							pending = true
							handle.update()
						}),
					]}
				>
					<label>
						Name
						<input name='name' defaultValue={company.name} required />
					</label>
					<label>
						Github
						<input name='github' defaultValue={company.github} required />
					</label>
					<label>
						Website
						<input name='website' defaultValue={company.website} required />
					</label>
					<button disabled={pending} type='submit'>
						{pending ? 'Saving...' : 'Save'}
					</button>
				</form>
			)
		}
	},
)
