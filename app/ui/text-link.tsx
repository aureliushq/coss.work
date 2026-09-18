import { css, type Handle, type RemixNode } from 'remix/ui'

export function TextLink(
	handle: Handle<{ children: RemixNode; href: string; underline?: boolean }>,
) {
	return () => {
		let { children, href, underline = false } = handle.props

		return (
			<a
				href={href}
				mix={css({
					'color': 'inherit',
					'textDecoration': underline ? 'underline' : 'none',
					'textUnderlineOffset': '2px',
					'&:hover, &:focus-visible': { textDecoration: 'underline' },
				})}
			>
				{children}
			</a>
		)
	}
}
