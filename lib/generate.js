const nacl = require('tweetnacl')

const clampSecret = secret => {
	secret[0] &= 248
	secret[31] = (secret[31] & 127) | 64
	return secret
}

module.exports = async () => {
	const key = clampSecret(nacl.randomBytes(32))
	const keyPair = nacl.box.keyPair.fromSecretKey(key)
	const pub = keyPair.publicKey

	return {
		privateKey: Buffer.from(key).toString('base64'),
		publicKey: Buffer.from(pub).toString('base64')
	}
}
if (require.main === module) {
	module.exports().then(r => console.log(JSON.stringify(r, null, 2)))
}
