module.exports = ({ privateKey, publicKey, config }) => `
[Interface]
PrivateKey = ${privateKey}
# PublicKey = ${publicKey}
Address = ${config.interface.addresses.v4}
# Address = ${config.interface.addresses.v6}
DNS = 1.1.1.1

[Peer]
PublicKey = ${config.peers[0].public_key}
Endpoint = ${config.peers[0].endpoint.v4}
# Endpoint = ${config.peers[0].endpoint.v6}
# Endpoint = ${config.peers[0].endpoint.host}
AllowedIPs = 0.0.0.0/0`.slice(1)
if (require.main === module) {
	require('get-stdin')()
		.then(JSON.parse)
		.then(o => {
			o.publicKey = process.argv[2]
			o.privateKey = process.argv[3]
			return o
		})
		.then(module.exports)
		.then(console.log)
}
