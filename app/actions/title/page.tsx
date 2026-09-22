import { css, type Handle } from 'remix/ui'

import {
	categoryDescription,
	categoryName,
	officeName,
	REPO_URL,
	stackFor,
	techName,
	type Company,
	type Job,
} from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { CompanyTable } from '../../ui/company-table.tsx'
import { headlineStyle } from '../../ui/headline.ts'
import { IconLink } from '../../ui/icon-link.tsx'
import { ArrowLeft } from '../../ui/icons.tsx'
import { SiteFooter } from '../../ui/site-footer.tsx'
import { joinList, summaryStyle } from '../../ui/summary.tsx'
import { TextLink } from '../../ui/text-link.tsx'
import { Document } from '../document.tsx'

export function TitlePage(handle: Handle<{ category: Job['category']; companies: Company[] }>) {
	return () => {
		let { category, companies } = handle.props
		let name = categoryName(category)

		return (
			<Document
				title={`${name} Jobs`}
				path={routes.title.show.href({ slug: category })}
				noindex={companies.length === 0}
				description={`${name} engineering jobs at commercial open-source companies.`}
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
						<h1 mix={headlineStyle}>{name} Jobs</h1>
						<nav aria-label={`${name} links`}>
							<IconLink href={routes.home.href()} icon={<ArrowLeft />}>
								home
							</IconLink>
						</nav>
						<TitleSummary category={category} companies={companies} />
						<p mix={summaryStyle}>{categoryDescription(category)}</p>
					</header>
					<CompanyTable
						companies={companies}
						empty={
							<p mix={css({ margin: 0 })}>
								know an open-source company hiring {name.toLowerCase()} engineers?{' '}
								<TextLink href={REPO_URL} external underline>
									add it
								</TextLink>
							</p>
						}
					/>
				</div>
				<SiteFooter />
			</Document>
		)
	}
}

// Tech and office names in the summary sentence, before it stops reading like a list.
const SUMMARY_LIST_LIMIT = 10

function TitleSummary(handle: Handle<{ category: Job['category']; companies: Company[] }>) {
	return () => {
		let { category, companies } = handle.props
		let name = categoryName(category).toLowerCase()

		if (companies.length === 0) {
			return <p mix={summaryStyle}>no open-source companies are hiring {name} right now.</p>
		}

		let jobs = companies.flatMap((company) => company.jobs)
		let stack = [...new Set(companies.flatMap(stackFor))].slice(0, SUMMARY_LIST_LIMIT)
		let allOffices = new Set(companies.flatMap((company) => company.offices))
		let remote = allOffices.delete('remote')
		let offices = [...allOffices].slice(0, SUMMARY_LIST_LIMIT)

		return (
			<p mix={summaryStyle}>
				{jobs.length} <strong>{name}</strong> {jobs.length === 1 ? 'job' : 'jobs'} (using{' '}
				{joinList(stack.map((id) => <strong>{techName(id)}</strong>))}){' '}
				{jobs.length === 1 ? 'is' : 'are'} currently available
				{remote && ' for remote work'}
				{offices.length > 0 && (
					<>
						{remote && ' and'} in{' '}
						{joinList(
							offices.map((office) => (
								<TextLink href={routes.location.show.href({ slug: office })}>
									<strong>{officeName(office)}</strong>
								</TextLink>
							)),
						)}{' '}
						{offices.length === 1 ? 'office' : 'offices'}
					</>
				)}
				.
			</p>
		)
	}
}
