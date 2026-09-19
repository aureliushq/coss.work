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

export function ArrowUpRightIcon() {
	return () => (
		<Icon>
			<path d='M7 17 17 7M8 7h9v9' />
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

export function BuildingComplexIcon() {
	return () => (
		<Icon>
			<path d='M10 12h4' />
			<path d='M10 8h4' />
			<path d='M14 21v-3a2 2 0 0 0-4 0v3' />
			<path d='M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2' />
			<path d='M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16' />
		</Icon>
	)
}

export function LinkIcon() {
	return () => (
		<Icon>
			<path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
			<path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
		</Icon>
	)
}
