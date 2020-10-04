const request = require('./https-request')

module.exports = async ({ id, token, license }) => {
	const json = await request(
		`https://api.cloudflareclient.com/v0a977/reg/${id}/account`,
		'PUT',
		{
			'User-Agent': 'okhttp/3.12.1',
			Authorization: `Bearer ${token}`
		},
		JSON.stringify({
			license
		})
    )
    const data = JSON.parse(json)
    if(data.success === false) {
        throw new Error(`${data.errors[0].message}(${data.errors[0].code})`);
    }
	return data
}
if (require.main === module) {
	require('get-stdin')()
		.then(JSON.parse)
		.then(module.exports)
		.then(r => console.log(JSON.stringify(r, null, 2)))
}
