import { css } from 'remix/ui'
import button from 'remix/ui/button'

const solidStyle = css({
	'--rmx-button-shadow': '0 0 0 0 transparent',
	'border': 0,
	'background': 'var(--solid-bg)',
	'color': 'var(--solid-text)',
	'textShadow': 'none',
	'fontFamily': 'var(--font-mono)',
	'fontSize': 'var(--type-body)',
	'fontWeight': 700,
	'paddingInline': '14px',
	'height': '34px',
	'&:hover:not(:disabled), &:active:not(:disabled)': {
		'--rmx-button-shadow': '0 0 0 0 transparent',
		'background': 'var(--solid-bg)',
		'opacity': 0.9,
	},
})

// remix/ui button behaviour and focus ring, restyled as the site's square dark button.
export function solidButton() {
	return [button({ size: 'lg', tone: 'primary' }), solidStyle] as const
}
