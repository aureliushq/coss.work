import { css, type Handle } from 'remix/ui'

import {
	// activityFor,
	currencySymbol,
	jobTitle,
	REPO_URL,
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
import { visuallyHidden } from '../ui/visually-hidden.ts'
import { Document } from './document.tsx'

export function HomePage(
	handle: Handle<{ companies: Company[]; query: string; stacks: string[] }>,
) {
	return () => {
		let { companies, query, stacks } = handle.props

		return (
			<Document
				title='coss.work · jobs at commercial open-source companies'
				head={
					<meta
						name='description'
						content='engineering jobs at commercial open-source companies. search by stack (Rust, Go, TypeScript, Kubernetes…) and apply.'
					/>
				}
			>
				<Hero query={query} stacks={stacks} />
				<CompanyTable companies={companies} query={query} />
				<SiteFooter />
			</Document>
		)
	}
}

function Hero(handle: Handle<{ query: string; stacks: string[] }>) {
	return () => (
		<section
			mix={css({
				display: 'grid',
				gap: '48px',
			})}
		>
			<header mix={css({ textAlign: 'center' })}>
				<h1
					mix={css({
						margin: 0,
						fontSize: 'clamp(1.75rem, 7vw, 2.25rem)',
						fontWeight: 600,
						lineHeight: 1.1,
						letterSpacing: '-0.02em',
					})}
				>
					get paid to work on open source
				</h1>
				<p
					mix={css({
						margin: '8px 0 0',
						color: 'var(--text-muted)',
						fontSize: '0.875rem',
					})}
				>
					engineering jobs at companies that build in the open
				</p>
			</header>
			<div mix={css({ display: 'grid', gap: '12px' })}>
				<SearchForm
					id='hero-search'
					label='what do you want to work with?'
					placeholder='Rust, Solidity, React, Kubernetes…'
					query={handle.props.query}
					showLabel
				/>
				<StackSuggestions query={handle.props.query} stacks={handle.props.stacks} />
			</div>
		</section>
	)
}

// One-click searches for the stacks most companies hire for. The active one reads as selected.
function StackSuggestions(handle: Handle<{ query: string; stacks: string[] }>) {
	return () => {
		let { query, stacks } = handle.props
		let active = query.trim().toLowerCase()

		return (
			<p mix={css({ margin: 0, color: 'var(--text-muted)' })}>
				try{' '}
				{stacks.map((stack, index) => (
					<span key={stack}>
						{index > 0 && ' · '}
						<span mix={css({ color: 'var(--text)' })}>
							{stack.toLowerCase() === active ? (
								stack
							) : (
								<TextLink
									href={routes.home.href(undefined, {
										searchParams: { q: stack },
									})}
								>
									{stack}
								</TextLink>
							)}
						</span>
					</span>
				))}
			</p>
		)
	}
}

function CompanyTable(handle: Handle<{ companies: Company[]; query: string }>) {
	return () => {
		let { companies, query } = handle.props

		return (
			<TableCard label='Companies hiring'>
				{query !== '' && companies.length > 0 && (
					<caption
						mix={css({
							padding: '14px 8px 0',
							textAlign: 'left',
							color: 'var(--text-muted)',
							whiteSpace: 'normal',
							overflowWrap: 'anywhere',
						})}
					>
						{companies.length}{' '}
						{companies.length === 1 ? 'company matches' : 'companies match'} “{query}” ·{' '}
						<TextLink href={routes.home.href()}>clear</TextLink>
					</caption>
				)}
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
							<span mix={visuallyHidden}>apply</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{companies.map((company, index) => (
						<CompanyRow key={company.slug} company={company} position={index + 1} />
					))}
					{companies.length === 0 && (
						<tr>
							<td colSpan={5}>
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
									<p mix={css({ margin: 0, color: 'var(--text)' })}>
										no companies match “{query}”
									</p>
									<p mix={css({ margin: 0 })}>
										try a stack above, or{' '}
										<TextLink href={routes.home.href()} underline>
											see all companies
										</TextLink>
									</p>
									<p mix={css({ margin: 0 })}>
										know an open-source company hiring for it?{' '}
										<TextLink href={REPO_URL} external underline>
											add it
										</TextLink>
									</p>
								</div>
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
		let stack = stackFor(company).join(', ')

		return (
			<tr>
				<td
					mix={css({
						color: 'var(--text-muted)',
						fontSize: 'var(--type-small)',
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
					title={stack}
					mix={css({
						maxWidth: '150px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					})}
				>
					{stack}
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
					<TextLink href={routes.job.show.href({ slug: company.slug })} underline>
						apply <span mix={visuallyHidden}>to {company.name}</span>
					</TextLink>
				</td>
			</tr>
		)
	}
}
