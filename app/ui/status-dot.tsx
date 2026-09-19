import { css } from 'remix/ui'

export function StatusDot() {
	return () => (
		<span
			aria-hidden='true'
			mix={css({
				display: 'inline-block',
				width: '5px',
				height: '5px',
				background: 'var(--success)',
				verticalAlign: 'middle',
			})}
		/>
	)
}
