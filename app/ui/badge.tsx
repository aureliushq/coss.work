import { css, type Handle, type RemixNode } from 'remix/ui'

export function Badge(handle: Handle<{ children: RemixNode; label?: string }>) {
	return () => (
		<span
			aria-label={handle.props.label}
			mix={css({
				display: 'inline-block',
				padding: '0 4px',
				borderRadius: '3px',
				background: 'var(--badge-bg)',
				color: 'var(--text-muted)',
				fontSize: '9px',
				lineHeight: '14px',
				verticalAlign: 'middle',
			})}
		>
			{handle.props.children}
		</span>
	)
}
