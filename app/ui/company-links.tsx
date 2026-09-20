import { css, type Handle } from 'remix/ui'

import { editUrl, type Company } from '../data/companies.ts'
import { routes } from '../routes.ts'
import { IconLink } from './icon-link.tsx'
import { ArrowLeft, GitHubIcon, LinkIcon, PenIcon, XLogoIcon } from './icons.tsx'

// The row of links under a company or job heading: home, the company's own sites, and edit.
export function CompanyLinks(handle: Handle<{ company: Company }>) {
	return () => {
		let { company } = handle.props
		let social = (host: string) => company.socials.find((url) => new URL(url).hostname === host)
		let github = social('github.com')
		let x = social('x.com')

		return (
			<nav
				aria-label={`${company.name} links`}
				mix={css({ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' })}
			>
				<IconLink href={routes.home.href()} icon={<ArrowLeft />}>
					home
				</IconLink>
				<IconLink href={company.url} icon={<LinkIcon />} external>
					{new URL(company.url).hostname.replace(/^www\./, '')}
				</IconLink>
				{github && (
					<IconLink href={github} icon={<GitHubIcon />} external>
						github
					</IconLink>
				)}
				{x && (
					<IconLink href={x} icon={<XLogoIcon />} external>
						x
					</IconLink>
				)}
				<IconLink href={editUrl(company)} icon={<PenIcon />} external>
					edit
				</IconLink>
			</nav>
		)
	}
}
