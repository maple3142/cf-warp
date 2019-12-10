const xf = require('xfetch-js')

function genString(length) {
	return [...Array(length)]
		.map(() => (~~(Math.random() * 36)).toString(36))
		.join('')
}

module.exports = async ({ publicKey, referrer }) => {
	const install_id = genString(11)
	const data = await xf
		.post('https://api.cloudflareclient.com/v0a745/reg', {
			headers: {
				'User-Agent': 'okhttp/3.12.1'
			},
			json: {
				key: publicKey || `${genString(43)}=`,
				install_id,
				fcm_token: `${install_id}:APA91b${genString(134)}`,
				referrer: referrer || '',
				warp_enabled: true,
				tos: new Date().toISOString().replace('Z', '+08:00'),
				type: 'Android',
				locale: 'en_US'
			}
		})
		.json()
	return data
}
if (require.main === module) {
	require('get-stdin')()
		.then(JSON.parse)
		.then(module.exports)
		.then(r => console.log(JSON.stringify(r, null, 2)))
}
