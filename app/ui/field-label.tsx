import { css, type Handle, type RemixNode } from 'remix/ui'

export function FieldLabel(handle: Handle<{ children: RemixNode; for?: string }>) {
	return () => (
		<label
			for={handle.props.for}
			mix={css({
				display: 'block',
				marginBottom: '8px',
				color: 'var(--text-muted)',
				fontSize: 'var(--type-small)',
				fontWeight: 500,
				letterSpacing: '0.02em',
				textTransform: 'uppercase',
			})}
		>
			{handle.props.children}
		</label>
	)
}
