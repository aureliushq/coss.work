import type { RequestHandler, RouterTypes } from 'remix/router'
import { css } from 'remix/ui'

import { routes } from '../routes.ts'
import { SiteFooter } from '../ui/site-footer.tsx'
import { TextLink } from '../ui/text-link.tsx'
import { Document } from './document.tsx'

export function NotFoundPage() {
	return () => (
		<Document title='not found · coss.work'>
			<header
				mix={css({
					display: 'grid',
					gap: '12px',
				})}
			>
				<h1
					mix={css({
						margin: 0,
						fontSize: '1.375rem',
						fontWeight: 600,
						lineHeight: 1.1,
						letterSpacing: '-0.02em',
					})}
				>
					page not found
				</h1>
				<p mix={css({ margin: 0, color: 'var(--text-muted)' })}>
					nothing lives at this address.{' '}
					<TextLink href={routes.home.href()} underline>
						browse all companies
					</TextLink>
				</p>
			</header>
			<SiteFooter />
		</Document>
	)
}

// Shared 404 response for unmatched routes and missing records.
export const notFound: RequestHandler<RouterTypes['context']> = (context) =>
	context.render(<NotFoundPage />, { status: 404 })
