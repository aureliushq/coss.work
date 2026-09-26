import { PostHog } from 'posthog-js'

const posthog = new PostHog()
const key = import.meta.env.VITE_POSTHOG_KEY
const host = import.meta.env.VITE_POSTHOG_HOST

export const posthogEnabled = Boolean(key && host)

if (!posthogEnabled) {
	if (import.meta.env.DEV) {
		let missingVariable = key ? 'VITE_POSTHOG_HOST' : 'VITE_POSTHOG_KEY'
		throw new Error(
			`${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
		)
	}
} else {
	posthog.init(key, {
		api_host: host,
		defaults: '2026-05-30',
		// Initial load only; client navigations are captured in capture-events.ts.
		capture_pageview: true,
		logs: {
			serviceName: 'coss-work-web',
			environment: import.meta.env.MODE,
		},
	})
	posthog.startExceptionAutocapture({
		capture_unhandled_errors: true,
		capture_unhandled_rejections: true,
		capture_console_errors: false,
	})
}

export { posthog }
