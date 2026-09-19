import { css, type Handle, type RemixNode } from 'remix/ui'

import { visuallyHidden } from './visually-hidden.ts'

// Screen readers ignore aria-label on a plain span, so the label is hidden text instead.
export function Badge(handle: Handle<{ children: RemixNode; label?: string }>) {
	return () => {
		let { children, label } = handle.props

		return (
			<span
				mix={css({
					display: 'inline-block',
					padding: '0 4px',
					background: 'var(--badge-bg)',
					color: 'var(--text-muted)',
					fontSize: 'var(--type-small)',
					lineHeight: 1.4,
					verticalAlign: 'middle',
				})}
			>
				{label === undefined ? (
					children
				) : (
					<>
						<span aria-hidden='true'>{children}</span>
						<span mix={visuallyHidden}>{label}</span>
					</>
				)}
			</span>
		)
	}
}
