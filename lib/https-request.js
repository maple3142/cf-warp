const https = require('https')

module.exports = (url, method, headers, body) =>
	new Promise((resolve, reject) => {
		const request = https.request(url, {
			headers,
			method,
			secureProtocol: 'TLSv1_1_method'
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
