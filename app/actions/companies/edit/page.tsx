import { css } from 'remix/ui'
import type { Handle } from 'remix/ui'

import { Document } from '../../document.tsx'
import type { Company } from '../data.ts'
import { CompanyEditForm } from './public/company-edit-form.tsx'

export function CompanyEditPage(handle: Handle<{ company: Company }>) {
	return () => {
		let { company } = handle.props
		return (
			<Document title={`Edit ${company.name} — Companies`}>
				<main mix={css({ padding: '1rem' })}>
					<h1>Edit {company.name}</h1>
					<CompanyEditForm company={company} />
				</main>
			</Document>
		)
	}
}
