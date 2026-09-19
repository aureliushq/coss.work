// Prisma Compute runs this entry on Bun. Bun's `node:http` truncates streamed responses, so this
// serves with `Bun.serve`. Bun also reads JSX settings from the tsconfig in the cwd (the artifact
// root on Compute, not this directory), so `.tsx` is transpiled here with this app's tsconfig.
const transpiler = new Bun.Transpiler({
	loader: 'tsx',
	autoImportJSX: true,
	tsconfig: await Bun.file(new URL('./tsconfig.json', import.meta.url)).text(),
})

Bun.plugin({
	name: 'app-tsconfig-jsx',
	setup(build) {
		build.onLoad({ filter: /\.tsx$/ }, async ({ path }) => ({
			contents: transpiler.transformSync(await Bun.file(path).text()),
			loader: 'js',
		}))
	},
})

const { router } = await import('./app/router.ts')

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 44100

Bun.serve({
	port,
	hostname: '0.0.0.0',
	async fetch(request) {
		try {
			return await router.fetch(request)
		} catch (error) {
			if (!(request.signal.aborted && error === request.signal.reason)) {
				console.error(error)
			}
			return new Response('Internal Server Error', { status: 500 })
		}
	},
})

console.log(`Server listening on http://localhost:${port}`)
