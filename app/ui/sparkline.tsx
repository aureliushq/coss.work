import { css, type Handle } from 'remix/ui'

const WIDTH = 72
const HEIGHT = 16

export function Sparkline(handle: Handle<{ values: number[] }>) {
	return () => {
		let { values } = handle.props
		let step = WIDTH / Math.max(values.length - 1, 1)
		let points = values
			.map(
				(value, i) =>
					`${(i * step).toFixed(1)},${(HEIGHT - 1 - value * (HEIGHT - 2)).toFixed(1)}`,
			)
			.join(' ')

		return (
			<svg
				aria-hidden='true'
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
				mix={css({ display: 'block', width: `${WIDTH}px`, height: `${HEIGHT}px` })}
			>
				<rect
					y={HEIGHT / 2}
					width={WIDTH}
					height={HEIGHT / 2}
					fill='var(--sparkline-fill)'
				/>
				<polyline points={points} fill='none' stroke='currentColor' stroke-width='0.75' />
			</svg>
		)
	}
}
