import { cloudflare } from '@cloudflare/vite-plugin'
import { remix } from '@pitlane/dev'
import { defineConfig } from 'vite-plus'

export default defineConfig({
	plugins: [
		remix({
			clientEntry: 'app/actions/public/entry.ts',
			serverEntry: 'app/router.ts',
			serverHandler: false,
		}),
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
	],
	staged: {
		'*': 'vp check --fix',
	},
	fmt: {
		jsdoc: true,
		jsxSingleQuote: true,
		quoteProps: 'consistent',
		semi: false,
		singleQuote: true,
		sortImports: true,
		sortTailwindcss: true,
		tabWidth: 4,
		trailingComma: 'all',
		useTabs: true,
	},
	lint: {
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
		rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
		options: { typeAware: true, typeCheck: true },
	},
})
