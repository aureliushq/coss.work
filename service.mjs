// @ts-check

import { compute } from '@prisma/composer-prisma-cloud'
import node from '@prisma/composer/node'

export default compute({
	name: 'coss-work',
	deps: {},
	build: node({ module: import.meta.url, dir: 'dist', entry: 'server.bun.ts' }),
})
