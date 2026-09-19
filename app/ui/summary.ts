import { css, type RemixNode } from 'remix/ui'

// Prose summary under a page title: bold facts, unbroken links, inline icons.
export const summaryStyle = css({
	'margin': 0,
	'maxWidth': '70ch',
	'& strong': { fontWeight: 700 },
	'& a': { whiteSpace: 'nowrap' },
	'& svg': {
		width: '0.85em',
		height: '0.85em',
		verticalAlign: 'middle',
	},
})

let listFormat = new Intl.ListFormat('en', { type: 'conjunction' })

// "a, b and c" with nodes in place of strings: format the indexes, then swap the nodes back in.
export function joinList(nodes: RemixNode[]) {
	return listFormat
		.formatToParts(nodes.map((_, index) => String(index)))
		.map((part) => (part.type === 'element' ? nodes[Number(part.value)] : part.value))
}
