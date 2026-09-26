import { css, type Handle } from 'remix/ui'

import { routes } from '../routes.ts'
import { FieldLabel } from './field-label.tsx'
import { SearchField } from './search-field.tsx'
import { solidButton } from './solid-button.ts'

export function SearchForm(
	handle: Handle<{
		id: string
		label: string
		placeholder: string
		query?: string
		showLabel?: boolean
	}>,
) {
	return () => {
		let { id, label, placeholder, query, showLabel = false } = handle.props

		return (
			<form
				action={routes.home.href()}
				method='get'
				role='search'
				data-track='search_submit'
				data-source={id}
			>
				{showLabel && <FieldLabel for={id}>{label}</FieldLabel>}
				<div mix={css({ display: 'flex', gap: '8px' })}>
					<div mix={css({ flex: 1, minWidth: 0 })}>
						<SearchField
							id={id}
							name='q'
							label={label}
							placeholder={placeholder}
							defaultValue={query}
						/>
					</div>
					{showLabel && (
						<button type='submit' mix={solidButton()}>
							find jobs
						</button>
					)}
				</div>
			</form>
		)
	}
}
