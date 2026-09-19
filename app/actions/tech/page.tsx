import { css, type Handle } from 'remix/ui'

import { categoryName, officeName, REPO_URL, type Company } from '../../data/companies.ts'
import { routes } from '../../routes.ts'
import { CompanyTable } from '../../ui/company-table.tsx'
import { IconLink } from '../../ui/icon-link.tsx'
import { ArrowLeft, ArrowUpRightIcon } from '../../ui/icons.tsx'
import { SiteFooter } from '../../ui/site-footer.tsx'
import { joinList, summaryStyle } from '../../ui/summary.ts'
import { TextLink } from '../../ui/text-link.tsx'
import { Document } from '../document.tsx'

export function TechPage(handle: Handle<{ name: string; companies: Company[] }>) {
	return () => {
		let { companies, name } = handle.props

		return (
			<Document
				title={`${name} Jobs`}
				head={
					<meta
						name='description'
						content={`${name} jobs at commercial open-source companies.`}
					/>
				}
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
						<h1
							mix={css({
								margin: 0,
								fontSize: '1.375rem',
								fontWeight: 600,
								lineHeight: 1.1,
								letterSpacing: '-0.02em',
							})}
						>
							{name} Jobs
						</h1>
						<nav aria-label={`${name} links`}>
							<IconLink href={routes.home.href()} icon={<ArrowLeft />}>
								home
							</IconLink>
						</nav>
						<TechSummary name={name} companies={companies} />
					</header>
					<CompanyTable
						companies={companies}
						empty={
							<p mix={css({ margin: 0 })}>
								know an open-source company hiring for {name}?{' '}
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

function TechSummary(handle: Handle<{ name: string; companies: Company[] }>) {
	return () => {
		let { companies, name } = handle.props

		if (companies.length === 0) {
			return (
				<p mix={summaryStyle}>no open-source companies are hiring for {name} right now.</p>
			)
		}

		let jobs = companies.flatMap((company) => company.jobs)
		let products = companies.flatMap((company) => company.products.slice(0, 1))
		let categories = [...new Set(jobs.map((job) => job.category))]
		let allOffices = new Set(companies.flatMap((company) => company.offices))
		let remote = allOffices.delete('remote')
		let offices = [...allOffices]
		let workplace =
			remote && offices.length > 0 ? 'remote and in-office' : remote ? 'remote' : 'in-office'

		return (
			<p mix={summaryStyle}>
				Use {name} to work on{' '}
				{joinList(
					products.map((product) => (
						<TextLink href={product.url} external>
							{product.name} <ArrowUpRightIcon />
						</TextLink>
					)),
				)}
				. {jobs.length} {workplace}{' '}
				{joinList(
					categories.map((category) => (
						<strong>{categoryName(category).toLowerCase()}</strong>
					)),
				)}{' '}
				{jobs.length === 1 ? 'job is' : 'jobs are'} currently available
				{offices.length > 0 && (
					<>
						{' '}
						in{' '}
						{joinList(offices.map((office) => <strong>{officeName(office)}</strong>))}
					</>
				)}
				.
			</p>
		)
	}
}
