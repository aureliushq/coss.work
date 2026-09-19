import { css, type Handle, type RemixNode } from 'remix/ui'

import {
	categoryName,
	editUrl,
	jobStack,
	jobTitle,
	officeName,
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
	GlobeIcon,
	PenIcon,
	XLogoIcon,
} from '../../ui/icons.tsx'
import { SiteFooter } from '../../ui/site-footer.tsx'
import { StatusDot } from '../../ui/status-dot.tsx'
import { TableCard } from '../../ui/table-card.tsx'
import { TextLink } from '../../ui/text-link.tsx'
import { Document } from '../document.tsx'

export function CompanyPage(handle: Handle<{ company: Company }>) {
	return () => {
		let { company } = handle.props

		return (
			<Document title={`${company.name} Jobs`}>
				<div
					mix={css({
						width: '100%',
						maxWidth: '760px',
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
			<header mix={css({ display: 'grid', gap: '12px' })}>
				<h1
					mix={css({
						margin: 0,
						fontFamily: 'var(--font-display)',
						fontSize: '24px',
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
					<IconLink href={company.url} icon={<GlobeIcon />} external>
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
			<p
				mix={css({
					'margin': 0,
					'maxWidth': '560px',
					'& strong': { fontWeight: 700 },
					'& a': { whiteSpace: 'nowrap' },
					'& svg': { width: '10px', height: '10px', verticalAlign: 'middle' },
				})}
			>
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
						{joinList(offices.map((office) => <strong>{officeName(office)}</strong>))}
					</>
				)}
				.
			</p>
		)
	}
}

let listFormat = new Intl.ListFormat('en', { type: 'conjunction' })

// "a, b and c" with nodes in place of strings: format the indexes, then swap the nodes back in.
function joinList(nodes: RemixNode[]) {
	return listFormat
		.formatToParts(nodes.map((_, index) => String(index)))
		.map((part) => (part.type === 'element' ? nodes[Number(part.value)] : part.value))
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
					</th>
				</tr>
			</thead>
			<tbody>
				{handle.props.jobs.map((job) => (
					<JobRow key={job.url} job={job} />
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
						{job.salary && <Badge label='salary listed'>$</Badge>}
					</span>
				</td>
				<td>{categoryName(job.category)}</td>
				<td>{job.type.charAt(0).toUpperCase() + job.type.slice(1)}</td>
				<td
					mix={css({
						maxWidth: '150px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					})}
				>
					{jobStack(job).join(', ')}
				</td>
				<td mix={css({ textAlign: 'right' })}>
					<TextLink href={job.url} external underline>
						apply
					</TextLink>
				</td>
			</tr>
		)
	}
}
