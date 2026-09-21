// OpenPanel analytics, loaded from the document head on every page.
// The client id is public by design, so both values are plain Worker vars.

// Queue proxy from OpenPanel's script-tag docs: buffers op(...) calls made
// before op1.js finishes loading.
const QUEUE_PROXY =
	'window.op=window.op||function(){var n=[];return new Proxy(function(){arguments.length&&n.push([].slice.call(arguments))},{get:function(t,r){return"q"===r?n:function(){n.push([r].concat([].slice.call(arguments)))}},has:function(t,r){return"q"===r}})}();'

export function OpenPanelScript() {
	return () => {
		// Read inside render: Workers disallow top-level work.
		let clientId = process.env.OPENPANEL_CLIENT_ID
		let apiUrl = process.env.OPENPANEL_API_URL
		if (!clientId || !apiUrl) return null

		let config = {
			clientId,
			apiUrl,
			// Covers the first document load; client navigations are handled in
			// app/actions/public/openpanel.ts.
			trackScreenViews: true,
			trackOutgoingLinks: true,
			// Turns data-track attributes into events, no hydration needed.
			trackAttributes: true,
		}

		return (
			<>
				<script>{`${QUEUE_PROXY}window.op('init',${JSON.stringify(config)});`}</script>
				<script src='https://openpanel.dev/op1.js' defer async />
			</>
		)
	}
}
