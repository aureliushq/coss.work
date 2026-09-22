import { css, type Handle } from 'remix/ui'

import { REPO_URL, type Company } from '../data/companies.ts'
import { routes } from '../routes.ts'
import { CompanyTable } from '../ui/company-table.tsx'
import { SearchForm } from '../ui/search-form.tsx'
import { SiteFooter } from '../ui/site-footer.tsx'
import { TextLink } from '../ui/text-link.tsx'
import { Document } from './document.tsx'

export function HomePage(
	handle: Handle<{ companies: Company[]; query: string; stacks: string[] }>,
) {
	return () => {
		let { companies, query, stacks } = handle.props

		return (
			<Document
				title='jobs at commercial open-source companies'
				path={routes.home.href()}
				description='engineering jobs at commercial open-source companies. search by stack (Rust, Go, TypeScript, Kubernetes…) and apply.'
			>
				<Hero query={query} stacks={stacks} />
				<CompanyTable
					companies={companies}
					numbered
					caption={
						query !== '' &&
						companies.length > 0 && (
							<>
								{companies.length}{' '}
								{companies.length === 1 ? 'company matches' : 'companies match'} “
								{query}” · <TextLink href={routes.home.href()}>clear</TextLink>
							</>
						)
					}
					empty={query === '' ? <NoListingsYet /> : <NoMatches query={query} />}
				/>
				<SiteFooter />
			</Document>
		)
	}
}

// Nothing is listed yet, so there is nothing to search. Point people at the repo instead.
function NoListingsYet() {
	return () => (
		<>
			<p mix={css({ margin: 0, color: 'var(--text)' })}>no listings yet</p>
			<p mix={css({ margin: 0 })}>the first open-source companies are being added</p>
			<p mix={css({ margin: 0 })}>
				hiring at one?{' '}
				<TextLink href={REPO_URL} external underline>
					add it
				</TextLink>
			</p>
		</>
	)
}

function NoMatches(handle: Handle<{ query: string }>) {
	return () => (
		<>
			<p mix={css({ margin: 0, color: 'var(--text)' })}>
				no companies match “{handle.props.query}”
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
		</>
	)
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
