const express = require('express')
const app = express()

const generate = require('cf-warp/lib/generate')
const register = require('cf-warp/lib/register')
const info = require('cf-warp/lib/info')
const ref = require('cf-warp/lib/ref')
const conf = require('cf-warp/lib/conf')

app.get('/', (req, res) => {
	res.send(`<a href="/warp.conf">Download a Warp conf now!</a>`)
})
app.get('/warp.conf', async (req, res) => {
	const keys = await generate()
	const data = await register(keys)
	const combined = Object.assign({}, keys, data, await info(data))
	res.set('Content-Disposition', 'attachment; filename="warp.conf"')
		.set('Content-Type', 'text/plain')
		.send(conf(combined))
})

app.listen(process.env.PORT)
