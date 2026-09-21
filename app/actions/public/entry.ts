import { run } from 'remix/ui'

import './openpanel.ts'

run({
	async loadModule(moduleUrl, exportName) {
		let mod = await import(/* @vite-ignore */ moduleUrl)
		let Component = mod[exportName]
		if (typeof Component !== 'function') {
			throw new Error(`Unknown component: ${moduleUrl}#${exportName}`)
		}
		return Component
	},
})
