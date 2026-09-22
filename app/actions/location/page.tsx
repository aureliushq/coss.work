import { css, type Handle } from 'remix/ui'

import { REPO_URL, stackFor, techName, type Company, type Location } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { CompanyTable } from '../../ui/company-table.tsx'
import { headlineStyle } from '../../ui/headline.ts'
import { IconLink } from '../../ui/icon-link.tsx'
import { ArrowLeft } from '../../ui/icons.tsx'
import { SiteFooter } from '../../ui/site-footer.tsx'
import { categoryList, joinList, summaryStyle } from '../../ui/summary.tsx'
import { TextLink } from '../../ui/text-link.tsx'
import { Document } from '../document.tsx'

export function LocationPage(
	handle: Handle<{ slug: string; location: Location; companies: Company[] }>,
) {
	return () => {
		let { companies, location, slug } = handle.props

		return (
			<Document
				title={`Jobs in ${location.name}`}
				path={routes.location.show.href({ slug })}
				noindex={companies.length === 0}
				description={`Engineering jobs at commercial open-source companies with an office in ${location.name}.`}
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
						<h1 mix={headlineStyle}>Jobs in {location.name}</h1>
						<div
							mix={css({
								display: 'flex',
								flexWrap: 'wrap',
								alignItems: 'center',
								gap: '12px',
							})}
						>
							<nav aria-label={`${location.name} links`}>
								<IconLink href={routes.home.href()} icon={<ArrowLeft />}>
									home
								</IconLink>
							</nav>
							{/* Plain text, not a link: there are no country pages. */}
							<span mix={css({ color: 'var(--text-muted)' })}>
								{location.country}
							</span>
						</div>
						<LocationSummary location={location} companies={companies} />
					</header>
					<CompanyTable
						companies={companies}
						empty={
							<p mix={css({ margin: 0 })}>
								know an open-source company hiring in {location.name}?{' '}
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

// Tech names in the summary sentence, before it stops reading like a list.
const SUMMARY_STACK_LIMIT = 10

function LocationSummary(handle: Handle<{ location: Location; companies: Company[] }>) {
	return () => {
		let { companies, location } = handle.props

		if (companies.length === 0) {
			return (
				<p mix={summaryStyle}>
					no open-source companies have an office in {location.name} right now.
				</p>
			)
		}

		let stack = [...new Set(companies.flatMap(stackFor))].slice(0, SUMMARY_STACK_LIMIT)
		let remote = companies.some((company) => company.offices.includes('remote'))
		// "San Francisco, California, United States"; the region is only set where it helps.
		let placeName = [location.name, location.region, location.country]
			.filter((part) => part !== undefined)
			.join(', ')

		return (
			<p mix={summaryStyle}>
				{companies.length} open-source{' '}
				{companies.length === 1 ? 'company is' : 'companies are'} hiring{' '}
				{categoryList(companies.flatMap((company) => company.jobs))} engineers to work with{' '}
				{joinList(stack.map((id) => <strong>{techName(id)}</strong>))}
				{remote && ' remotely and'} in their {placeName} office.
			</p>
		)
	}
}
