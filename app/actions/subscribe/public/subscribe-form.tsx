import { clientEntry, css, on, type Dispatched, type Handle } from 'remix/ui'

import { routes } from '../../../routes.ts'

export const SubscribeForm = clientEntry(import.meta.url, function SubscribeForm(handle: Handle) {
	let done = false
	let pending = false

	const subscribe = async (
		event: Dispatched<SubmitEvent, HTMLFormElement>,
		signal: AbortSignal,
	) => {
		event.preventDefault()
		pending = true
		handle.update()
		const form = event.currentTarget
		const response = await fetch(form.action, {
			method: 'post',
			body: new FormData(form),
			signal,
		})
		pending = false
		done = response.ok
		handle.update()
	}

	return () => {
		return (
			<form
				action={routes.subscribe.edit.href()}
				method='post'
				mix={[
					css({
						'display': 'grid',
						'gap': '0.75rem',
						'maxWidth': 'fit-content',
						'& input': { marginLeft: '0.5rem' },
					}),
					on('submit', subscribe),
				]}
			>
				<label>
					Name
					<input name='name' required />
				</label>
				<label>
					Email Address
					<input name='email' required />
				</label>
				<button disabled={pending} type='submit'>
					{pending ? 'Subscribing...' : 'Subscribe'}
				</button>
			</form>
		)
	}
})
