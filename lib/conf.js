module.exports = ({ privateKey, publicKey, config }) =>
        `
[Interface]
PrivateKey = ${privateKey}
# PublicKey = ${publicKey}
Address = ${config.interface.addresses.v4}
Address = ${config.interface.addresses.v6}
${process.platform == "linux"
    ? `Address = ${config.interface.addresses.v6.replace(
        "fd01:5ca1",
        "2001:db8"
      )}`
    : ""
}
DNS = 1.1.1.1

[Peer]
PublicKey = ${config.peers[0].public_key}
Endpoint = ${config.peers[0].endpoint.host}
# Endpoint = ${config.peers[0].endpoint.v4}
# Endpoint = ${config.peers[0].endpoint.v6}
AllowedIPs = 0.0.0.0/0
AllowedIPs = ::/0
${process.platform == "linux"
    ? `PostUp = ip6tables -t nat -I POSTROUTING 1 -o %i -j SNAT --to-source ${config.interface.addresses.v6}
PreDown = ip6tables -t nat -D POSTROUTING 1`
    : ""
}`.slice(1)

if (require.main === module) {
  require("get-stdin")()
    .then(JSON.parse)
    .then(o => {
      o.publicKey = process.argv[2];
      o.privateKey = process.argv[3];
      return o;
    })
    .then(module.exports)
    .then(console.log);
}
