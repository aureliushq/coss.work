import { css, type Handle } from 'remix/ui'
import input from 'remix/ui/input'

import { SearchIcon } from './icons.tsx'

export interface SearchFieldProps {
	id?: string
	label: string
	name: string
	placeholder: string
	defaultValue?: string
}

export function SearchField(handle: Handle<SearchFieldProps>) {
	return () => {
		let { defaultValue, id, label, name, placeholder } = handle.props

		return (
			<div mix={[input.root({ size: 'lg' }), fieldFrameStyle]}>
				<SearchIcon />
				<input
					id={id}
					type='search'
					name={name}
					aria-label={label}
					placeholder={placeholder}
					defaultValue={defaultValue}
					mix={[input.field(), fieldInputStyle]}
				/>
			</div>
		)
	}
}

// Shared by every text field on the page (search boxes and the subscribe email).
export const fieldFrameStyle = css({
	'--rmx-input-height': '34px',
	'--rmx-input-icon-color': 'var(--text-muted)',
	'--rmx-input-icon-size': '12px',
	'background': 'var(--field-bg)',
	'&:not(:focus-within)': { boxShadow: 'none' },
	'color': 'var(--text)',
	'fontFamily': 'var(--font-mono)',
	'fontSize': '12px',
	'fontFeatureSettings': 'normal',
	'textShadow': 'none',
})

export const fieldInputStyle = css({
	'fontFamily': 'inherit',
	'fontSize': 'inherit',
	'color': 'inherit',
	'&::placeholder': { color: 'var(--text-muted)' },
})
