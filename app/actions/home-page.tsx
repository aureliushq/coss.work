import { css, type Handle } from 'remix/ui'

import {
	// activityFor,
	jobTitle,
	stackFor,
	type Company,
} from '../data/companies.ts'
import { routes } from '../routes.ts'
import { Badge } from '../ui/badge.tsx'
import { SearchForm } from '../ui/search-form.tsx'
import { SiteFooter } from '../ui/site-footer.tsx'
// import { Sparkline } from "../ui/sparkline.tsx";
import { StatusDot } from '../ui/status-dot.tsx'
import { TableCard } from '../ui/table-card.tsx'
import { TextLink } from '../ui/text-link.tsx'
import { Document } from './document.tsx'

export function HomePage(handle: Handle<{ companies: Company[]; query: string }>) {
	return () => {
		let { companies, query } = handle.props

		return (
			<Document title='coss.work · work at commercial open-source companies'>
				<Hero query={query} />
				<CompanyTable companies={companies} query={query} />
				<SiteFooter />
			</Document>
		)
	}
}

function Hero(handle: Handle<{ query: string }>) {
	return () => (
		<section
			mix={css({
				width: '100%',
				maxWidth: '760px',
				display: 'grid',
				gap: '48px',
			})}
		>
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
				work at commercial open-source companies
			</h1>
			<SearchForm
				id='hero-search'
				label='what do you want to work with?'
				placeholder='Rust, Solidity, React, Kubernetes…'
				query={handle.props.query}
				showLabel
			/>
		</section>
	)
}

function CompanyTable(handle: Handle<{ companies: Company[]; query: string }>) {
	return () => {
		let { companies, query } = handle.props

		return (
			<TableCard label='Companies hiring'>
				<thead>
					<tr>
						<th>
							<span mix={visuallyHidden}>#</span>
						</th>
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
							<StatusDot /> <span aria-hidden='true'>⋯</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{companies.map((company, index) => (
						<CompanyRow key={company.slug} company={company} position={index + 1} />
					))}
					{companies.length === 0 && (
						<tr>
							<td
								colSpan={6}
								mix={css({ textAlign: 'center', color: 'var(--text-muted)' })}
							>
								no companies match “{query}”
							</td>
						</tr>
					)}
				</tbody>
			</TableCard>
		)
	}
}

function CompanyRow(handle: Handle<{ company: Company; position: number }>) {
	return () => {
		let { company, position } = handle.props
		let [job, ...otherJobs] = company.jobs

		return (
			<tr>
				<td
					mix={css({
						color: 'var(--text-muted)',
						fontSize: '9px',
						textAlign: 'right',
					})}
				>
					{position}
				</td>
				<td>
					<TextLink href={routes.companies.show.href({ slug: company.slug })}>
						{company.name}
					</TextLink>
				</td>
				<td
					mix={css({
						maxWidth: '150px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					})}
				>
					{stackFor(company).join(', ')}
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
						{job?.salary && <Badge label='salary listed'>$</Badge>}
						{otherJobs.length > 0 && (
							<Badge label={`${otherJobs.length} more roles`}>
								+{otherJobs.length}
							</Badge>
						)}
					</span>
				</td>
				<td mix={css({ textAlign: 'right' })}>
					<TextLink href={routes.job.show.href({ slug: company.slug })} underline>
						apply
					</TextLink>
				</td>
			</tr>
		)
	}
}

const visuallyHidden = css({
	position: 'absolute',
	width: '1px',
	height: '1px',
	overflow: 'hidden',
	clip: 'rect(0 0 0 0)',
	whiteSpace: 'nowrap',
})
