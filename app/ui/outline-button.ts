import { css } from 'remix/ui'
import button from 'remix/ui/button'

const outlineStyle = css({
	'--rmx-button-shadow': '3px 3px 0 var(--border)',
	'border': '1px solid var(--border)',
	'background': 'var(--card-bg)',
	'color': 'var(--text)',
	'textShadow': 'none',
	'textDecoration': 'none',
	'fontFamily': 'var(--font-mono)',
	'fontWeight': 400,
	'paddingInline': '14px',
	'height': '38px',
	'&:hover, &:active': {
		'--rmx-button-shadow': '1px 1px 0 var(--border)',
		'background': 'var(--card-bg)',
		'color': 'var(--text)',
	},
})

// remix/ui button behaviour and focus ring, restyled as the site's raised card button.
export function outlineButton() {
	return [button({ size: 'lg' }), outlineStyle] as const
}
