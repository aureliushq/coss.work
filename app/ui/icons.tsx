// Inline stroke icons (24×24 grid) so the page needs no external icon assets.
import type { Handle, RemixNode } from 'remix/ui'

function Icon(handle: Handle<{ children: RemixNode }>) {
	return () => (
		<svg
			aria-hidden='true'
			viewBox='0 0 24 24'
			width='14'
			height='14'
			fill='none'
			stroke='currentColor'
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'
		>
			{handle.props.children}
		</svg>
	)
}

export function SearchIcon() {
	return () => (
		<Icon>
			<circle cx='11' cy='11' r='7' />
			<path d='m20 20-4-4' />
		</Icon>
	)
}

export function LockIcon() {
	return () => (
		<Icon>
			<rect x='5' y='11' width='14' height='10' rx='2' />
			<path d='M8 11V7a4 4 0 0 1 8 0v4' />
		</Icon>
	)
}

export function ChevronDownIcon() {
	return () => (
		<Icon>
			<path d='m6 9 6 6 6-6' />
		</Icon>
	)
}

export function BookIcon() {
	return () => (
		<Icon>
			<path d='M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5' />
		</Icon>
	)
}

export function LaptopIcon() {
	return () => (
		<Icon>
			<rect x='4' y='5' width='16' height='11' rx='1' />
			<path d='M2 20h20' />
		</Icon>
	)
}

export function CodeIcon() {
	return () => (
		<Icon>
			<path d='m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16' />
		</Icon>
	)
}

export function GlobeIcon() {
	return () => (
		<Icon>
			<circle cx='12' cy='12' r='9' />
			<path d='M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18' />
		</Icon>
	)
}

export function GitHubIcon() {
	return () => (
		<Icon>
			<path d='M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.9-2.4c3-.3 6.1-1.5 6.1-6.6a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.7 12.7 0 0 0-6.6 0C5.9 1.4 4.8 1.7 4.8 1.7a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.1 3.1 6.3 6.1 6.6a3 3 0 0 0-.9 2.4V22' />
		</Icon>
	)
}

export function BirdIcon() {
	return () => (
		<Icon>
			<path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
		</Icon>
	)
}

export function AtIcon() {
	return () => (
		<Icon>
			<circle cx='12' cy='12' r='4' />
			<path d='M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' />
		</Icon>
	)
}

export function RssIcon() {
	return () => (
		<Icon>
			<path d='M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16' />
			<circle cx='5' cy='19' r='1' />
		</Icon>
	)
}

export function ContrastIcon() {
	return () => (
		<Icon>
			<rect x='2' y='7' width='20' height='10' rx='5' />
			<circle cx='16' cy='12' r='3' />
		</Icon>
	)
}

export function XLogoIcon() {
	return () => (
		<Icon>
			<path d='m4 4 11.7 16H20L8.3 4zM4 20l6.8-6.8m2.4-2.4L20 4' />
		</Icon>
	)
}

export function PenIcon() {
	return () => (
		<Icon>
			<path d='M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' />
			<path d='M18.4 2.6a1 1 0 0 1 3 3l-9 9a2 2 0 0 1-.9.5l-2.9.8a.5.5 0 0 1-.6-.6l.8-2.9a2 2 0 0 1 .5-.8z' />
		</Icon>
	)
}

export function ArrowLeft() {
	return () => (
		<Icon>
			<path d='m12 19-7-7 7-7' />
			<path d='M19 12H5' />
		</Icon>
	)
}

export function CloudIcon() {
	return () => (
		<Icon>
			<path d='M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' />
		</Icon>
	)
}
