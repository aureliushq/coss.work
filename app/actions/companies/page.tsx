import { css, type Handle } from 'remix/ui'

import type { Company } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { ArrowLeft, GitHubIcon, GlobeIcon, PenIcon, XLogoIcon } from '../../ui/icons.tsx'
import { themeStyle } from '../../ui/theme.ts'
import { Document } from '../document.tsx'

export function CompanyPage(handle: Handle<{ company: Company }>) {
	return () => {
		const { company } = handle.props
		return (
			<Document title={`${company.name} Jobs`}>
				<main
					mix={[
						themeStyle,
						css({
							'& *, & *::before, & *::after': { boxSizing: 'border-box' },
							'minHeight': '100vh',
							'padding': '96px 16px 40px',
							'background': 'var(--page-bg)',
							'color': 'var(--text)',
							'fontFamily': 'var(--font-mono)',
							'fontSize': '12px',
							'lineHeight': 1.5,
							'WebkitFontSmoothing': 'antialiased',
							'display': 'flex',
							'flexDirection': 'column',
							'alignItems': 'center',
							'gap': '64px',
						}),
					]}
				>
					<Hero company={company} />
				</main>
			</Document>
		)
	}
}

function Hero(handle: Handle<{ company: Company }>) {
	return () => {
		const { company } = handle.props
		const social = (host: string) =>
			company.socials.find((url) => new URL(url).hostname === host)

		return (
			<section
				mix={css({
					width: '100%',
					maxWidth: '760px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					gap: '8px',
				})}
			>
				<a
					href={routes.home.href()}
					mix={css({
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						textDecoration: 'none',
						color: 'inherit',
						marginBottom: '24px',
					})}
				>
					<ArrowLeft />
					home
				</a>
				<h1
					mix={css({
						margin: 0,
						fontFamily: 'var(--font-display)',
						fontSize: 'clamp(30px, 7vw, 40px)',
						fontWeight: 600,
						lineHeight: 1.1,
						letterSpacing: '-0.02em',
						textAlign: 'center',
					})}
				>
					{company.name}
				</h1>
				<p mix={css({ display: 'flex', gap: '24px' })}>
					<a
						href={social('github.com')}
						mix={css({
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							textDecoration: 'none',
							color: 'inherit',
						})}
						rel='noopener noreferrer'
						target='_blank'
					>
						<GitHubIcon />
						github
					</a>
					<a
						href={social('x.com')}
						mix={css({
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							textDecoration: 'none',
							color: 'inherit',
						})}
						rel='noopener noreferrer'
						target='_blank'
					>
						<XLogoIcon />x
					</a>
					<a
						href={company.url}
						mix={css({
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							textDecoration: 'none',
							color: 'inherit',
						})}
						rel='noopener noreferrer'
						target='_blank'
					>
						<GlobeIcon />
						website
					</a>
					<a
						href={`https://github.com/aureliushq/coss.work/blob/main/app/data/companies/${company.slug.charAt(0)}/${company.slug}.json`}

						mix={css({
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							textDecoration: 'none',
							color: 'inherit',
						})}
						rel='noopener noreferrer'
						target='_blank'
					>
						<PenIcon />
						edit
					</a>
				</p>
			</section>
		)
	}
}
