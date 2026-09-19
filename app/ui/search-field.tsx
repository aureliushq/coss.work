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
	'--rmx-input-icon-size': '1em',
	'background': 'var(--field-bg)',
	'&:not(:focus-within)': { boxShadow: 'none' },
	'color': 'var(--text)',
	'fontFamily': 'var(--font-mono)',
	'fontSize': 'var(--type-body)',
	// iOS Safari zooms the page when a focused input is under 16px.
	'@media (pointer: coarse)': { fontSize: '1rem' },
	'fontFeatureSettings': 'normal',
	'textShadow': 'none',
})

export const fieldInputStyle = css({
	'fontFamily': 'inherit',
	'fontSize': 'inherit',
	'color': 'inherit',
	'&::placeholder': { color: 'var(--text-muted)' },
})
