const execa = require('execa')

module.exports = async () => {
	const { stdout: privateKey } = await execa('wg', ['genkey'])
	const { stdout: publicKey } = await execa('wg', ['pubkey'], {
		input: privateKey
	})
	return {
		privateKey,
		publicKey
	}
}
if (require.main === module) {
	module.exports().then(r => console.log(JSON.stringify(r, null, 2)))
}
