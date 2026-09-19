import { css, type Handle, type RemixNode } from 'remix/ui'

export function IconLink(
	handle: Handle<{ children: RemixNode; href: string; icon: RemixNode; external?: boolean }>,
) {
	return () => {
		let { children, external = false, href, icon } = handle.props

		return (
			<a
				href={href}
				rel={external ? 'noopener noreferrer' : undefined}
				target={external ? '_blank' : undefined}
				mix={css({
					'display': 'inline-flex',
					'alignItems': 'center',
					'gap': '4px',
					'color': 'inherit',
					'textDecoration': 'none',
					'textUnderlineOffset': '2px',
					'& svg': { width: '10px', height: '10px' },
					'&:hover, &:focus-visible': { textDecoration: 'underline' },
				})}
			>
				{icon}
				{children}
			</a>
		)
	}
}
