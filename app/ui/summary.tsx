import { css, type RemixNode } from 'remix/ui'

import { categoryName, type Job } from '../data/companies.ts'

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

// "frontend, backend and devops": the categories these jobs hire for, in the order they appear.
export function categoryList(jobs: Job[]) {
	let categories = [...new Set(jobs.map((job) => job.category))]

	return joinList(
		categories.map((category) => <strong>{categoryName(category).toLowerCase()}</strong>),
	)
}
