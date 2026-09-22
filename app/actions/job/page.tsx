import { css, type Handle } from 'remix/ui'

import {
	jobSlug,
	jobTitle,
	salaryRange,
	techName,
	type Company,
	type Job,
} from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { CompanyLinks } from '../../ui/company-links.tsx'
import { headlineStyle } from '../../ui/headline.ts'
import { SiteFooter } from '../../ui/site-footer.tsx'
import { solidButton } from '../../ui/solid-button.ts'
import { buildingLine, joinList, summaryStyle } from '../../ui/summary.tsx'
import { TextLink } from '../../ui/text-link.tsx'
import { Document } from '../document.tsx'

export function JobPage(handle: Handle<{ company: Company; job: Job }>) {
	return () => {
		let { company, job } = handle.props
		let title = `${company.name}: ${jobTitle(job)}`
		let host = new URL(company.url).hostname.replace(/^www\./, '')

		return (
			<Document
				title={title}
				path={routes.job.show.href({ slug: jobSlug(company, job) })}
				description={`${company.name} is hiring a ${jobTitle(job)}. Apply at ${host}.`}
			>
				<div
					mix={css({
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						gap: '32px',
					})}
				>
					<header mix={css({ display: 'grid', gap: '12px', overflowWrap: 'anywhere' })}>
						<h1 mix={headlineStyle}>
							{company.name}: {jobTitle(job)}
						</h1>
						<CompanyLinks company={company} />
						<p mix={summaryStyle}>{buildingLine(company)}.</p>
					</header>
					<section
						aria-label='This opening'
						mix={css({
							display: 'grid',
							gap: '32px',
							justifyItems: 'center',
							background: 'var(--card-bg)',
							padding: '32px 12px',
						})}
					>
						<p mix={[summaryStyle, css({ justifySelf: 'stretch' })]}>
							{company.name} is looking for a {job.type}{' '}
							<strong>{jobTitle(job)}</strong>
							{job.salary && <> ({salaryRange(job.salary)})</>}.
							{job.tech.length > 0 && (
								<>
									{' '}
									Experience in{' '}
									{joinList(
										job.tech.map((id) => (
											<TextLink href={routes.tech.show.href({ slug: id })}>
												<strong>{techName(id)}</strong>
											</TextLink>
										)),
									)}{' '}
									is preferred.
								</>
							)}
						</p>
						<a
							href={job.url}
							rel='noopener noreferrer'
							target='_blank'
							mix={solidButton()}
							data-track='apply_click'
							data-company={company.slug}
							data-job={job.position}
						>
							apply at {host}
						</a>
						<TextLink href={routes.companies.show.href({ slug: company.slug })}>
							all positions
						</TextLink>
					</section>
				</div>
				<SiteFooter />
			</Document>
		)
	}
}
