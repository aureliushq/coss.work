import { css } from 'remix/ui'

// Design tokens shared by the atoms in app/ui. Colours follow the document's
// `color-scheme: light dark`, the same mechanism the remix/ui primitives use.
export const themeStyle = css({
	'--font-mono': "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
	'--font-display': 'Outfit, ui-sans-serif, system-ui, sans-serif',
	'--page-bg': 'light-dark(#f6f6f6, #1f2023)',
	'--card-bg': 'light-dark(#ffffff, #25262a)',
	'--border': 'light-dark(#ededed, #2e2f33)',
	'--text': 'light-dark(#222222, #e8e8e8)',
	'--text-muted': 'light-dark(#8a8a8a, #8e8e93)',
	'--field-bg': 'light-dark(#ececec, #2b2c30)',
	'--badge-bg': 'light-dark(#ececec, #34353a)',
	'--sparkline-fill': 'light-dark(#efefef, #2e2f33)',
	'--solid-bg': 'light-dark(#2b2b2b, #111111)',
	'--solid-text': '#ffffff',
	'--highlight': 'light-dark(#fdf0c4, #34353a)',
	'--success': '#22c55e',
})
