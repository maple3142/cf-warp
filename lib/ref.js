const register = require('./register')

module.exports = async ({ id }) => {
	await register({ referrer: id })
}
if (require.main === module) {
	require('get-stdin')()
		.then(JSON.parse)
		.then(module.exports)
		.then(r => console.log(JSON.stringify(r, null, 2)))
}
