import { css, type Handle, type RemixNode } from 'remix/ui'

import { SubscribeForm } from '../actions/subscribe/public/subscribe-form.tsx'
import { REPO_URL } from '../data/companies.ts'
import { routes } from '../routes.ts'
import { labelStyle } from './field-label.tsx'
import {
	BookIcon,
	BuildingComplexIcon,
	CloudIcon,
	CodeIcon,
	GitHubIcon,
	LaptopIcon,
} from './icons.tsx'
import { outlineButton } from './outline-button.ts'
import { SearchForm } from './search-form.tsx'
import { TextLink } from './text-link.tsx'

// Subscribe, browse and search block shared by every page, plus the site footer bar.
export function SiteFooter() {
	return () => (
		<>
			{/* Parked until email alerts have a real backend. */}
			{/* <SubscribeSection /> */}
			<PostJobSection />
			<Directory />
			<footer
				mix={css({
					display: 'grid',
					gap: '40px',
				})}
			>
				<SearchForm id='footer-search' label='search companies' placeholder='search' />
				<div
					mix={css({
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: '12px',
					})}
				>
					<a
						href={routes.home.href()}
						mix={css({
							color: 'inherit',
							textDecoration: 'none',
							fontSize: '1.125rem',
							fontWeight: 600,
							letterSpacing: '-0.02em',
						})}
					>
						coss.work
					</a>
					<div
						mix={css({
							'display': 'flex',
							'alignItems': 'center',
							'gap': '12px',
							'color': 'var(--text-muted)',
							'fontSize': 'var(--type-small)',
							'& a': {
								color: 'inherit',
								display: 'inline-flex',
								alignItems: 'center',
							},
							'& a:hover, & a:focus-visible': { color: 'var(--text)' },
						})}
					>
						<a
							href={REPO_URL}
							aria-label='GitHub'
							rel='noopener noreferrer'
							target='_blank'
						>
							<GitHubIcon />
						</a>
						<a href='#'>privacy</a>
						<span>© {new Date().getFullYear()}</span>
					</div>
				</div>
			</footer>
		</>
	)
}

// oxlint-disable-next-line no-unused-vars -- parked until email alerts have a real backend
function SubscribeSection() {
	return () => (
		<section
			mix={css({
				display: 'grid',
				gap: '40px',
			})}
		>
			<header mix={css({ textAlign: 'center' })}>
				<h2
					mix={css({
						margin: 0,
						fontSize: '1.125rem',
						fontWeight: 600,
						letterSpacing: '-0.01em',
					})}
				>
					not looking yet?{' '}
					<mark
						mix={css({
							background: 'var(--highlight)',
							color: 'inherit',
							padding: '0 2px',
						})}
					>
						let the jobs come to you
					</mark>{' '}
					📬
				</h2>
				<p mix={css({ margin: '4px 0 0', color: 'var(--text-muted)' })}>
					new open-source companies in your stack / unsub anytime
				</p>
			</header>
			<SubscribeForm />
		</section>
	)
}

function PostJobSection() {
	return () => (
		<section
			mix={css({
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: '12px 24px',
			})}
		>
			<header>
				<h2
					mix={css({
						margin: 0,
						fontSize: '0.875rem',
						fontWeight: 600,
						letterSpacing: '-0.01em',
					})}
				>
					hiring at an open-source company?
				</h2>
				<p mix={css({ margin: '2px 0 0', color: 'var(--text-muted)' })}>
					reach engineers who want to work on open source
				</p>
			</header>
			<a href={REPO_URL} rel='noopener noreferrer' target='_blank' mix={outlineButton()}>
				add your company
			</a>
		</section>
	)
}

type DirectoryColumn = {
	title: string
	icon: RemixNode
	route: typeof routes.location.show | typeof routes.tech.show | typeof routes.title.show
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
		links: ['React', 'Kubernetes', 'Terraform', 'Node.js', 'Redis', 'PostgreSQL', 'MySQL'],
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
		icon: <BuildingComplexIcon />,
		route: routes.location.show,
		links: ['SF', 'NYC', 'Berlin', 'Paris', 'London', 'Amsterdam', 'Seattle', 'Tel Aviv'],
	},
]

function Directory() {
	return () => (
		<nav
			aria-label='Browse jobs'
			mix={css({
				'display': 'grid',
				'gridTemplateColumns': '1fr 1fr 1fr 1fr 1fr',
				'justifyContent': 'space-between',
				'gap': '32px',
				'whiteSpace': 'nowrap',
				'@media (max-width: 560px)': {
					gridTemplateColumns: 'repeat(2, 1fr)',
					gap: '24px 16px',
				},
			})}
		>
			{DIRECTORY.map((column) => (
				<div key={column.title}>
					<h3 mix={[labelStyle, directoryHeadingStyle]}>
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
								<TextLink
									href={column.route.href({
										slug: SLUGS[label] ?? slugify(label),
									})}
								>
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

// Labels that don't slugify to their id: grouped techs link to the main one, cities to their id.
const SLUGS: Record<string, string> = {
	'TypeScript/JavaScript': 'typescript',
	'C & C++': 'cpp',
	'SF': 'san-francisco',
	'NYC': 'new-york',
}

function slugify(label: string) {
	return label
		.toLowerCase()
		.replace(/\+/g, 'p')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

const directoryHeadingStyle = css({
	'display': 'flex',
	'alignItems': 'center',
	'gap': '4px',
	'& svg': { width: '0.85em', height: '0.85em' },
})
