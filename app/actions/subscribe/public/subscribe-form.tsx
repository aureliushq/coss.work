import { clientEntry, css, on, type Dispatched, type Handle } from 'remix/ui'
import input from 'remix/ui/input'
import { Option, Select } from 'remix/ui/select'

import { routes } from '../../../routes.ts'
import { FieldLabel } from '../../../ui/field-label.tsx'
import { LockIcon } from '../../../ui/icons.tsx'
import { fieldFrameStyle, fieldInputStyle } from '../../../ui/search-field.tsx'
import { solidButton } from '../../../ui/solid-button.ts'

const STACKS = ['Rust', 'Go', 'TypeScript', 'Python', 'Ruby', 'C++', 'Solidity', 'K8s']
const SALARIES = ['100k', '150k', '200k']

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
						'gridTemplateColumns':
							'minmax(0, 1.9fr) minmax(0, 1fr) minmax(0, 1fr) auto',
						'gap': '8px',
						'alignItems': 'end',
						'@media (max-width: 560px)': { gridTemplateColumns: '1fr 1fr' },
					}),
					on('submit', subscribe),
				]}
			>
				<div mix={css({ '@media (max-width: 560px)': { gridColumn: '1 / -1' } })}>
					<FieldLabel for='subscribe-email'>email me companies</FieldLabel>
					<div mix={[input.root({ size: 'lg' }), fieldFrameStyle]}>
						<LockIcon />
						<input
							id='subscribe-email'
							type='email'
							name='email'
							placeholder='you@gmail.com'
							autoComplete='email'
							required
							mix={[input.field(), fieldInputStyle]}
						/>
					</div>
				</div>
				<div>
					<FieldLabel for='subscribe-stack'>that use</FieldLabel>
					<Select
						id='subscribe-stack'
						name='stack'
						defaultLabel='any stack'
						defaultValue='any'
						mix={selectTriggerStyle}
					>
						<Option label='any stack' value='any' />
						{STACKS.map((stack) => (
							<Option key={stack} label={stack} value={stack.toLowerCase()} />
						))}
					</Select>
				</div>
				<div>
					<FieldLabel for='subscribe-salary'>&amp; pay min salary</FieldLabel>
					<Select
						id='subscribe-salary'
						name='salary'
						defaultLabel='$100k+/yr'
						defaultValue='100k'
						mix={selectTriggerStyle}
					>
						{SALARIES.map((salary) => (
							<Option key={salary} label={`$${salary}+/yr`} value={salary} />
						))}
					</Select>
				</div>
				<button disabled={pending} type='submit' mix={solidButton()}>
					{pending ? 'subscribing…' : done ? 'subscribed ✓' : 'subscribe'}
				</button>
			</form>
		)
	}
})

const selectTriggerStyle = css({
	'width': '100%',
	'height': '34px',
	'borderRadius': '3px',
	'background': 'var(--field-bg)',
	'color': 'var(--text)',
	'fontFamily': 'var(--font-mono)',
	'fontSize': '12px',
	'fontFeatureSettings': 'normal',
	'textShadow': 'none',
	'&:not(:focus-visible):not([aria-expanded="true"])': { boxShadow: 'none' },
	'&:hover, &:active, &[aria-expanded="true"]': {
		background: 'var(--field-bg)',
		color: 'var(--text)',
	},
})
