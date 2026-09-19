import { css, type Handle, type RemixNode } from 'remix/ui'

import {
	// activityFor,
	positionName,
	stackFor,
	type Company,
} from '../data/companies.ts'
import { routes } from '../routes.ts'
import { Badge } from '../ui/badge.tsx'
import { FieldLabel } from '../ui/field-label.tsx'
import {
	AtIcon,
	BirdIcon,
	BookIcon,
	ChevronDownIcon,
	CloudIcon,
	CodeIcon,
	ContrastIcon,
	GitHubIcon,
	GlobeIcon,
	LaptopIcon,
	RssIcon,
} from '../ui/icons.tsx'
import { SearchField } from '../ui/search-field.tsx'
import { solidButton } from '../ui/solid-button.ts'
// import { Sparkline } from "../ui/sparkline.tsx";
import { StatusDot } from '../ui/status-dot.tsx'
import { TextLink } from '../ui/text-link.tsx'
import { themeStyle } from '../ui/theme.ts'
import { Document } from './document.tsx'
import { SubscribeForm } from './subscribe/public/subscribe-form.tsx'

export function HomePage(handle: Handle<{ companies: Company[]; query: string }>) {
	return () => {
		let { companies, query } = handle.props

		return (
			<Document
				title='coss.work · work at commercial open-source companies'
				head={<HomeHead />}
			>
				<main
					mix={[
						themeStyle,
						css({
							'& *, & *::before, & *::after': { boxSizing: 'border-box' },
							'minHeight': '100vh',
							'padding': '96px 16px 40px',
							'background': 'var(--page-bg)',
							'color': 'var(--text)',
							'fontFamily': 'var(--font-mono)',
							'fontSize': '12px',
							'lineHeight': 1.5,
							'WebkitFontSmoothing': 'antialiased',
							'display': 'flex',
							'flexDirection': 'column',
							'alignItems': 'center',
							'gap': '64px',
						}),
					]}
				>
					<Hero query={query} />
					<CompanyTable companies={companies} query={query} />
					<SubscribeSection />
					<Directory />
					<SiteFooter />
				</main>
			</Document>
		)
	}
}

function HomeHead() {
	return () => (
		<>
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
			<link
				rel='stylesheet'
				href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Outfit:wght@500;600&display=swap'
			/>
		</>
	)
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

function SearchForm(
	handle: Handle<{
		id: string
		label: string
		placeholder: string
		query?: string
		showLabel?: boolean
	}>,
) {
	return () => {
		let { id, label, placeholder, query, showLabel = false } = handle.props

		return (
			<form action={routes.home.href()} method='get' role='search'>
				{showLabel && <FieldLabel for={id}>{label}</FieldLabel>}
				<div mix={css({ display: 'flex', gap: '8px' })}>
					<div mix={css({ flex: 1, minWidth: 0 })}>
						<SearchField
							id={id}
							name='q'
							label={label}
							placeholder={placeholder}
							defaultValue={query}
						/>
					</div>
					{showLabel && (
						<button type='submit' mix={solidButton()}>
							search
						</button>
					)}
				</div>
			</form>
		)
	}
}

function CompanyTable(handle: Handle<{ companies: Company[]; query: string }>) {
	return () => {
		let { companies, query } = handle.props

		return (
			<section
				aria-label='Companies hiring'
				mix={css({
					width: '100%',
					maxWidth: '760px',
					overflowX: 'auto',
					background: 'var(--card-bg)',
					padding: '0 12px',
				})}
			>
				<table mix={tableStyle}>
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
				</table>
			</section>
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
						{job &&
							`${job.level === 'senior' ? 'Sr ' : ''}${positionName(job.position)}`}
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

function SubscribeSection() {
	return () => (
		<section
			mix={css({
				width: '100%',
				maxWidth: '760px',
				display: 'grid',
				gap: '40px',
			})}
		>
			<header mix={css({ textAlign: 'center' })}>
				<h2
					mix={css({
						margin: 0,
						fontFamily: 'var(--font-display)',
						fontSize: '20px',
						fontWeight: 600,
						letterSpacing: '-0.01em',
					})}
				>
					comfortable? let’s{' '}
					<mark
						mix={css({
							background: 'var(--highlight)',
							color: 'inherit',
							padding: '0 2px',
						})}
					>
						shake that up
					</mark>{' '}
					a bit 🎲
				</h2>
				<p mix={css({ margin: '4px 0 0', color: 'var(--text-muted)' })}>
					keep an eye on the market / unsub anytime
				</p>
			</header>
			<SubscribeForm />
		</section>
	)
}

type DirectoryColumn = {
	title: string
	icon: RemixNode
	route: typeof routes.tech.show | typeof routes.title.show
	links: string[]
}

const DIRECTORY: DirectoryColumn[] = [
	{
		title: 'languages',
		icon: <BookIcon />,
		route: routes.tech.show,
		links: ['Rust', 'Go', 'TypeScript/JavaScript', 'Python', 'Java', 'PHP', 'Ruby', 'C & C++'],
	},
	{
		title: 'tech',
		icon: <LaptopIcon />,
		route: routes.tech.show,
		links: ['React', 'Kubernetes', 'Terraform', 'Node', 'Redis', 'PostgreSQL', 'MySQL'],
	},
	{
		title: 'type',
		icon: <CodeIcon />,
		route: routes.title.show,
		links: ['Frontend', 'Backend', 'Full-Stack', 'Mobile', 'DevOps'],
	},
	{
		title: 'cloud',
		icon: <CloudIcon />,
		route: routes.tech.show,
		links: ['AWS', 'GCP', 'Azure'],
	},
	{
		title: 'offices',
		icon: <GlobeIcon />,
		route: routes.tech.show,
		links: ['SF', 'NYC', 'Berlin', 'Paris', 'USA', 'Canada', 'India', 'Israel'],
	},
]

function Directory() {
	return () => (
		<nav
			aria-label='Browse jobs'
			mix={css({
				width: '100%',
				maxWidth: '760px',
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
				justifyContent: 'space-between',
				gap: '32px',
				whiteSpace: 'nowrap',
			})}
		>
			{DIRECTORY.map((column) => (
				<div key={column.title}>
					<h3 mix={directoryHeadingStyle}>
						{column.title} {column.icon}
					</h3>
					<ul
						mix={css({
							listStyle: 'none',
							margin: 0,
							padding: 0,
							lineHeight: 1.7,
						})}
					>
						{column.links.map((label) => (
							<li key={label}>
								<TextLink href={column.route.href({ slug: slugify(label) })}>
									<DirectoryLabel label={label} />
								</TextLink>
							</li>
						))}
					</ul>
				</div>
			))}
		</nav>
	)
}

function DirectoryLabel(handle: Handle<{ label: string }>) {
	return () => {
		let [first, second] = handle.props.label.split(' & ')
		if (second === undefined) return <>{first}</>

		return (
			<>
				{first} <span mix={css({ color: 'var(--text-muted)' })}>&amp;</span> {second}
			</>
		)
	}
}

function SiteFooter() {
	return () => (
		<footer
			mix={css({
				width: '100%',
				maxWidth: '760px',
				display: 'grid',
				gap: '40px',
			})}
		>
			<SearchForm id='footer-search' label='search companies' placeholder='search' />
			<div
				mix={css({
					'display': 'flex',
					'flexWrap': 'wrap',
					'justifyContent': 'flex-end',
					'alignItems': 'center',
					'gap': '12px',
					'color': 'var(--text-muted)',
					'fontSize': '10px',
					'& a': {
						color: 'inherit',
						display: 'inline-flex',
						alignItems: 'center',
					},
					'& a:hover, & a:focus-visible': { color: 'var(--text)' },
				})}
			>
				<a href='#' aria-label='GitHub'>
					<GitHubIcon />
				</a>
				<a href='#' aria-label='Twitter'>
					<BirdIcon />
				</a>
				<a href='#' aria-label='Email'>
					<AtIcon />
				</a>
				<a href='#' aria-label='RSS feed'>
					<RssIcon />
				</a>
				<a href='#' aria-label='Theme'>
					<ContrastIcon />
				</a>
				<a href='#' aria-label='Language'>
					<GlobeIcon />
					<ChevronDownIcon />
				</a>
				<a href='#'>privacy</a>
				<span>© {new Date().getFullYear()}</span>
			</div>
		</footer>
	)
}

function slugify(label: string) {
	return label
		.toLowerCase()
		.replace(/\+/g, 'p')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

const tableStyle = css({
	'width': '100%',
	'borderCollapse': 'collapse',
	'whiteSpace': 'nowrap',
	'& th': {
		padding: '14px 8px 10px',
		textAlign: 'left',
		fontWeight: 700,
		fontSize: '11px',
	},
	'& td': {
		padding: '0 8px',
		height: '34px',
		borderTop: '1px solid var(--border)',
	},
})

const directoryHeadingStyle = css({
	'display': 'flex',
	'alignItems': 'center',
	'gap': '4px',
	'margin': '0 0 8px',
	'color': 'var(--text-muted)',
	'fontFamily': 'var(--font-display)',
	'fontSize': '10px',
	'fontWeight': 500,
	'textTransform': 'uppercase',
	'& svg': { width: '10px', height: '10px' },
})

const visuallyHidden = css({
	position: 'absolute',
	width: '1px',
	height: '1px',
	overflow: 'hidden',
	clip: 'rect(0 0 0 0)',
	whiteSpace: 'nowrap',
})
