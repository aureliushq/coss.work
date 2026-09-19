import { css, type Handle, type RemixNode } from 'remix/ui'

export function TableCard(handle: Handle<{ children: RemixNode; label: string }>) {
	return () => (
		<section
			aria-label={handle.props.label}
			mix={css({
				overflowX: 'auto',
				background: 'var(--card-bg)',
				padding: '0 12px',
			})}
		>
			<table mix={tableStyle}>{handle.props.children}</table>
		</section>
	)
}

const tableStyle = css({
	'width': '100%',
	'borderCollapse': 'collapse',
	'whiteSpace': 'nowrap',
	'& th': {
		padding: '14px 8px 10px',
		textAlign: 'left',
		fontWeight: 700,
	},
	'& td': {
		padding: '0 8px',
		height: '34px',
		borderTop: '1px solid var(--border)',
	},
})
