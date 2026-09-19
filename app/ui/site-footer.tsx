import { css, type Handle, type RemixNode } from 'remix/ui'

import { SubscribeForm } from '../actions/subscribe/public/subscribe-form.tsx'
import { REPO_URL } from '../data/companies.ts'
import { routes } from '../routes.ts'
import { BookIcon, CloudIcon, CodeIcon, GitHubIcon, GlobeIcon, LaptopIcon } from './icons.tsx'
import { outlineButton } from './outline-button.ts'
import { SearchForm } from './search-form.tsx'
import { TextLink } from './text-link.tsx'

// Subscribe, browse and search block shared by every page, plus the site footer bar.
export function SiteFooter() {
	return () => (
		<>
			<SubscribeSection />
			<PostJobSection />
			<Directory />
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
							fontSize: '20px',
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
							'fontSize': '10px',
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
						fontSize: '20px',
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
				width: '100%',
				maxWidth: '760px',
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
						fontSize: '14px',
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
	'margin': '0 0 8px',
	'color': 'var(--text-muted)',
	'fontSize': '10px',
	'fontWeight': 500,
	'textTransform': 'uppercase',
	'& svg': { width: '10px', height: '10px' },
})
