import { css, type Handle, type RemixNode } from 'remix/ui'

import {
	// activityFor,
	currencySymbol,
	jobSlug,
	jobTitle,
	stackFor,
	techName,
	type Company,
} from '../data/companies.ts'
import { routes } from '../routes.ts'
import { Badge } from './badge.tsx'
// import { Sparkline } from "./sparkline.tsx";
// import { StatusDot } from './status-dot.tsx'
import { stackCellStyle, TableCard } from './table-card.tsx'
import { TextLink } from './text-link.tsx'
import { visuallyHidden } from './visually-hidden.ts'

export function CompanyTable(
	handle: Handle<{
		companies: Company[]
		empty: RemixNode
		caption?: RemixNode
		numbered?: boolean
	}>,
) {
	return () => {
		let { caption, companies, empty, numbered = false } = handle.props

		return (
			<TableCard label='Companies hiring'>
				{caption && (
					<caption
						mix={css({
							padding: '14px 8px 0',
							textAlign: 'left',
							color: 'var(--text-muted)',
							whiteSpace: 'normal',
							overflowWrap: 'anywhere',
						})}
					>
						{caption}
					</caption>
				)}
				<thead>
					<tr>
						{numbered && (
							<th>
								<span mix={visuallyHidden}>#</span>
							</th>
						)}
						<th>Company</th>
						<th>
							Stack
							{/* <StatusDot /> */}
						</th>
						{/* <th> */}
						{/* 	Activity <StatusDot /> */}
						{/* </th> */}
						<th>Hiring</th>
						<th mix={css({ textAlign: 'right' })}>
							{/* Parked until the columns can actually be filtered. */}
							{/* <StatusDot /> <span aria-hidden='true'>⋯</span> */}
							<span mix={visuallyHidden}>apply</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{companies.map((company, index) => (
						<CompanyRow
							key={company.slug}
							company={company}
							position={numbered ? index + 1 : undefined}
						/>
					))}
					{companies.length === 0 && (
						<tr>
							<td colSpan={numbered ? 5 : 4}>
								<div
									mix={css({
										padding: '24px 0',
										display: 'grid',
										gap: '4px',
										textAlign: 'center',
										whiteSpace: 'normal',
										overflowWrap: 'anywhere',
										color: 'var(--text-muted)',
									})}
								>
									{empty}
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</TableCard>
		)
	}
}

function CompanyRow(handle: Handle<{ company: Company; position?: number }>) {
	return () => {
		let { company, position } = handle.props
		let [job, ...otherJobs] = company.jobs
		let stack = stackFor(company)

		return (
			<tr>
				{position !== undefined && (
					<td
						mix={css({
							color: 'var(--text-muted)',
							fontSize: 'var(--type-small)',
							textAlign: 'right',
						})}
					>
						{position}
					</td>
				)}
				<td>
					<TextLink href={routes.companies.show.href({ slug: company.slug })}>
						{company.name}
					</TextLink>
				</td>
				<td title={stack.map(techName).join(', ')} mix={stackCellStyle}>
					{stack.map((id, index) => (
						<span key={id}>
							{index > 0 && ', '}
							<TextLink href={routes.tech.show.href({ slug: id })}>
								{techName(id)}
							</TextLink>
						</span>
					))}
				</td>
				{/* <td> */}
				{/* 	<Sparkline values={activityFor(company.slug)} /> */}
				{/* </td> */}
				<td>
					<span
						mix={css({
							display: 'inline-flex',
							gap: '6px',
							alignItems: 'center',
						})}
					>
						{job && jobTitle(job)}
						{job?.salary && (
							<Badge label='salary listed'>{currencySymbol(job.salary)}</Badge>
						)}
						{otherJobs.length > 0 && (
							<Badge label={`${otherJobs.length} more roles`}>
								+{otherJobs.length}
							</Badge>
						)}
					</span>
				</td>
				<td mix={css({ textAlign: 'right' })}>
					{job && (
						<TextLink
							href={routes.job.show.href({ slug: jobSlug(company, job) })}
							underline
						>
							apply <span mix={visuallyHidden}>to {company.name}</span>
						</TextLink>
					)}
				</td>
			</tr>
		)
	}
}
