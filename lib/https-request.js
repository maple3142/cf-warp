const https = require('https')

// TLS1.1 or lower is not usable in OpenSSL 3.0+
function sslCompat() {
	const openSSLMajor = Number(process.versions.openssl[0])
	if (openSSLMajor < 3) {
		return {secureProtocol: 'TLSv1_1_method'}
	}
	return {}
}

module.exports = (url, method, headers, body) =>
	new Promise((resolve, reject) => {
		const request = https.request(url, {
			headers,
			method,
			...sslCompat()
		})
		request.end(body)
		request.on('response', response => {
			const chunks = []
			response.on('data', chunk => chunks.push(chunk))
			response.on('end', () => {
				const buf = Buffer.concat(chunks)
				resolve(buf.toString('utf-8'))
			})
			response.on('error', reject)
		})
		request.on('error', reject)
	})
