const request = require('./https-request')

module.exports = async ({ id, token }) => {
	const json = await request(
		`https://api.cloudflareclient.com/v0i1909221500/reg/${id}`,
		'GET',
		{
			'User-Agent': 'okhttp/3.12.1',
			Authorization: `Bearer ${token}`
		}
	)
	const data = JSON.parse(json)
	if (data.success) {
		return data.result
	}
	throw new Error(data)
}
if (require.main === module) {
	require('get-stdin')()
		.then(JSON.parse)
		.then(module.exports)
		.then(r => console.log(JSON.stringify(r, null, 2)))
}
