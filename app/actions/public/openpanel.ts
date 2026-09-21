// Remix navigates through the Navigation API. OpenPanel's trackScreenViews only
// patches history.pushState/replaceState/popstate, so it never sees those
// transitions — fire the screen view ourselves.

declare global {
	interface Window {
		op?: (method: string, ...args: unknown[]) => void
	}
}

let lastHref = location.href

window.navigation?.addEventListener('navigatesuccess', () => {
	if (location.href === lastHref) return
	lastHref = location.href
	window.op?.('screenView')
})
