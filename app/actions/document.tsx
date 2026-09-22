import { HMR } from 'pitlane:dev'
import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'

import { themeStyle } from '../ui/theme.ts'
import { OpenPanelScript } from './openpanel.tsx'
import clientAssets from './public/entry.ts?assets=client'

export interface DocumentProps {
	children?: RemixNode
	description?: string
	title?: string
}

const DEFAULT_TITLE = readAppDisplayName('Coss.work')
// Crawlers need an absolute URL for the share image.
const OG_IMAGE_URL = 'https://coss.work/og.png'

export function Document(handle: Handle<DocumentProps>) {
	return () => {
		let { children, description, title = DEFAULT_TITLE } = handle.props

		return (
			<html lang='en'>
				<head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='color-scheme' content='light dark' />
					{/* favicon.svg carries its own prefers-color-scheme rule, so it follows the tab theme. */}
					<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
					<link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
					<link rel='shortcut icon' href='/favicon.ico' />
					<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
					<link rel='manifest' href='/site.webmanifest' />
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link
						rel='preconnect'
						href='https://fonts.gstatic.com'
						crossOrigin='anonymous'
					/>
					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&display=swap'
					/>
					<title>{title}</title>
					{description && <meta name='description' content={description} />}
					<meta property='og:title' content={title} />
					{description && <meta property='og:description' content={description} />}
					<meta property='og:site_name' content='coss.work' />
					<meta property='og:type' content='website' />
					<meta property='og:image' content={OG_IMAGE_URL} />
					<meta property='og:image:width' content='1200' />
					<meta property='og:image:height' content='630' />
					<meta name='twitter:card' content='summary_large_image' />
					<meta name='twitter:image' content={OG_IMAGE_URL} />
					<OpenPanelScript />
					{clientAssets.css.map((attrs) => (
						<link key={attrs.href} {...attrs} rel='stylesheet' />
					))}
					<script src={clientAssets.entry} type='module' />
					{clientAssets.js.map((attrs) => (
						<link key={attrs.href} {...attrs} rel='modulepreload' />
					))}
				</head>
				<body mix={[themeStyle, bodyStyle]}>
					<HMR />
					<main mix={mainStyle}>{children}</main>
				</body>
			</html>
		)
	}
}

const bodyStyle = css({
	// Square corners everywhere, including remix/ui popovers whose radii aren't configurable.
	'& *, & *::before, & *::after': { boxSizing: 'border-box', borderRadius: '0 !important' },
	'& :is(h1, h2, h3)': { textWrap: 'balance' },
	'& ::selection': { background: 'var(--highlight)', color: 'var(--text)' },
	'margin': 0,
	'background': 'var(--page-bg)',
	'color': 'var(--text)',
	'fontFamily': 'var(--font-mono)',
	'caretColor': 'var(--text)',
	'scrollbarColor': 'var(--border) transparent',
	'fontSize': 'var(--type-body)',
	'lineHeight': 1.5,
	'WebkitFontSmoothing': 'antialiased',
})

const mainStyle = css({
	// Every page section sits in the one centred column.
	'& > *': { width: '100%', maxWidth: '760px' },
	'minHeight': '100vh',
	'padding': '96px 16px 40px',
	'display': 'flex',
	'flexDirection': 'column',
	'alignItems': 'center',
	'gap': '64px',
})

function readAppDisplayName(value: string): string {
	return value.startsWith('%%') ? 'Remix App' : decodeURIComponent(value)
}
