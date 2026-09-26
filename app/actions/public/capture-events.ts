import { posthog, posthogEnabled } from './posthog.ts'

// Events are declared in markup: data-track names the event and every other
// data-* attribute becomes a property. Forms fire on submit, anything else on click.
function captureTracked(element: HTMLElement) {
	let { track, ...properties } = element.dataset
	if (track) posthog.capture(track, properties)
}

document.addEventListener('submit', (event) => {
	if (!posthogEnabled || !(event.target instanceof HTMLFormElement)) return
	captureTracked(event.target)
})

document.addEventListener('click', (event) => {
	if (!posthogEnabled || !(event.target instanceof Element)) return
	let element = event.target.closest<HTMLElement>('[data-track]:not(form)')
	if (element) captureTracked(element)
})

// Remix navigates through the Navigation API, which PostHog's history_change
// pageview tracking never sees, so capture those pageviews here.
let lastHref = location.href

window.navigation?.addEventListener('navigatesuccess', () => {
	if (!posthogEnabled || location.href === lastHref) return
	lastHref = location.href
	posthog.capture('$pageview')
})
