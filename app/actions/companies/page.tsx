import { css, type Handle } from 'remix/ui'

import {
	categoryName,
	currencySymbol,
	editUrl,
	jobTitle,
	officeName,
	techName,
	type Company,
	type Job,
} from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { Badge } from '../../ui/badge.tsx'
import { IconLink } from '../../ui/icon-link.tsx'
import {
	ArrowLeft,
	ArrowUpRightIcon,
	GitHubIcon,
	LinkIcon,
	PenIcon,
	XLogoIcon,
} from '../../ui/icons.tsx'
import { SiteFooter } from '../../ui/site-footer.tsx'
import { StatusDot } from '../../ui/status-dot.tsx'
import { joinList, summaryStyle } from '../../ui/summary.ts'
import { stackCellStyle, TableCard } from '../../ui/table-card.tsx'
import { TextLink } from '../../ui/text-link.tsx'
import { visuallyHidden } from '../../ui/visually-hidden.ts'
import { Document } from '../document.tsx'

export function CompanyPage(handle: Handle<{ company: Company }>) {
	return () => {
		let { company } = handle.props

		return (
			<Document title={`${company.name} Jobs`}>
				<div
					mix={css({
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
						gap: '32px',
					})}
				>
					<CompanyHeader company={company} />
					<JobsTable jobs={company.jobs} />
				</div>
				<SiteFooter />
			</Document>
		)
	}
}

function CompanyHeader(handle: Handle<{ company: Company }>) {
	return () => {
		let { company } = handle.props
		let social = (host: string) => company.socials.find((url) => new URL(url).hostname === host)
		let github = social('github.com')
		let x = social('x.com')

		return (
			<header mix={css({ display: 'grid', gap: '12px', overflowWrap: 'anywhere' })}>
				<h1
					mix={css({
						margin: 0,
						fontSize: '1.375rem',
						fontWeight: 600,
						lineHeight: 1.1,
						letterSpacing: '-0.02em',
					})}
				>
					{company.name}
				</h1>
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
				<CompanySummary company={company} />
			</header>
		)
	}
}

function CompanySummary(handle: Handle<{ company: Company }>) {
	return () => {
		let { company } = handle.props
		let categories = [...new Set(company.jobs.map((job) => job.category))]
		let remote = company.offices.includes('remote')
		let offices = company.offices.filter((office) => office !== 'remote')
		let count = company.jobs.length

		return (
			<p mix={summaryStyle}>
				{company.name} is building {company.building}
				{company.products.length > 0 && (
					<>
						{' ('}
						{joinList(
							company.products.map((product) => (
								<TextLink href={product.url} external>
									{product.name} <ArrowUpRightIcon />
								</TextLink>
							)),
						)}
						)
					</>
				)}
				. Hiring for {count}{' '}
				{joinList(
					categories.map((category) => (
						<strong>{categoryName(category).toLowerCase()}</strong>
					)),
				)}{' '}
				engineering {count === 1 ? 'position' : 'positions'}
				{remote && ' remotely'}
				{offices.length > 0 && (
					<>
						{remote && ','} with offices in{' '}
						{joinList(
							offices.map((office) => (
								<TextLink href={routes.location.show.href({ slug: office })}>
									<strong>{officeName(office)}</strong>
								</TextLink>
							)),
						)}
					</>
				)}
				.
			</p>
		)
	}
}

function JobsTable(handle: Handle<{ jobs: Job[] }>) {
	return () => (
		<TableCard label='Open positions'>
			<thead>
				<tr>
					<th>Hiring</th>
					<th>Type</th>
					<th>
						Employment <StatusDot />
					</th>
					<th>
						Stack <StatusDot />
					</th>
					<th mix={css({ textAlign: 'right' })}>
						<StatusDot /> <span aria-hidden='true'>⋯</span>
						<span mix={visuallyHidden}>apply</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{handle.props.jobs.map((job, index) => (
					<JobRow key={index} job={job} />
				))}
			</tbody>
		</TableCard>
	)
}

function JobRow(handle: Handle<{ job: Job }>) {
	return () => {
		let { job } = handle.props

		return (
			<tr>
				<td>
					<span
						mix={css({
							display: 'inline-flex',
							gap: '6px',
							alignItems: 'center',
						})}
					>
						{jobTitle(job)}
						{job.salary && (
							<Badge label='salary listed'>{currencySymbol(job.salary)}</Badge>
						)}
					</span>
				</td>
				<td>{categoryName(job.category)}</td>
				<td>{job.type.charAt(0).toUpperCase() + job.type.slice(1)}</td>
				<td title={job.tech.map(techName).join(', ')} mix={stackCellStyle}>
					{job.tech.map((id, index) => (
						<span key={id}>
							{index > 0 && ', '}
							<TextLink href={routes.tech.show.href({ slug: id })}>
								{techName(id)}
							</TextLink>
						</span>
					))}
				</td>
				<td mix={css({ textAlign: 'right' })}>
					<TextLink href={job.url} external underline>
						apply <span mix={visuallyHidden}>for {jobTitle(job)}</span>
					</TextLink>
				</td>
			</tr>
		)
	}
}
