import { posthog, posthogEnabled } from './posthog.ts'

type LogAttributes = Record<string, boolean | number | string>

export const posthogLogger = {
	info(message: string, attributes: LogAttributes) {
		if (posthogEnabled) posthog.logger.info(message, attributes)
	},
	error(message: string, attributes: LogAttributes) {
		if (posthogEnabled) posthog.logger.error(message, attributes)
	},
}
