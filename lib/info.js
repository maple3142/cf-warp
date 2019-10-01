const xf = require('xfetch-js')

module.exports = async ({ id, token }) => {
	const data = await xf
		.get(`https://api.cloudflareclient.com/v0i1909221500/reg/${id}`, {
			headers: {
				Accept: '*/*',
				Authorization: `Bearer ${token}`,
				'Accept-Encoding': 'gzip',
				'Accept-Language': 'Language',
				'User-Agent': '1.1.1.1/1909221500.1 CFNetwork/978.0.7 Darwin/18.7.0'
			}
		})
		.json()
	if(data.success){
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
