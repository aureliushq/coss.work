import { css, type Handle, type RemixNode } from 'remix/ui'

// The Label type role: field labels and directory headings. The only uppercase text.
export const labelStyle = css({
	margin: '0 0 8px',
	color: 'var(--text-muted)',
	fontSize: 'var(--type-small)',
	fontWeight: 500,
	letterSpacing: '0.02em',
	textTransform: 'uppercase',
})

export function FieldLabel(handle: Handle<{ children: RemixNode; for?: string }>) {
	return () => (
		<label for={handle.props.for} mix={[labelStyle, css({ display: 'block' })]}>
			{handle.props.children}
		</label>
	)
}
