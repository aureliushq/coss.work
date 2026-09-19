import type { Handle, RemixNode } from 'remix/ui'
import { css } from 'remix/ui'
import { ImportMap } from 'remix/ui/server'

import { scriptEntry } from '../assets.ts'
import { themeStyle } from '../ui/theme.ts'

export interface DocumentProps {
	children?: RemixNode
	head?: RemixNode
	title?: string
}

const DEFAULT_TITLE = readAppDisplayName('Coss.work')

export function Document(handle: Handle<DocumentProps>) {
	return () => {
		let { children, head, title = DEFAULT_TITLE } = handle.props
		let { href, importMap, preloads } = scriptEntry

		return (
			<html lang='en'>
				<head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='width=device-width, initial-scale=1' />
					<meta name='color-scheme' content='light dark' />
					<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
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
					{head}
					<ImportMap value={importMap} />
					{preloads.map((preloadHref) => (
						<link key={preloadHref} rel='modulepreload' href={preloadHref} />
					))}
					<script type='module' src={href}></script>
				</head>
				<body mix={[themeStyle, bodyStyle]}>
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
	minHeight: '100vh',
	padding: '96px 16px 40px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '64px',
})

function readAppDisplayName(value: string): string {
	return value.startsWith('%%') ? 'Remix App' : decodeURIComponent(value)
}
