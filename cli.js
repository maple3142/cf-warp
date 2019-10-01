#!/usr/bin/env node

const path = require('path')
const os = require('os')
const fs = require('fs-extra')
const generate = require('./lib/generate')
const register = require('./lib/register')
const info = require('./lib/info')
const ref = require('./lib/ref')
const conf = require('./lib/conf')

const args = process.argv.slice(2)
const HOME = os.homedir()
const CONFIG_DIR = path.join(HOME, '.cf-warp')
if (!fs.existsSync(CONFIG_DIR)) {
	fs.mkdirSync(CONFIG_DIR)
}

const resovle = file => path.join(CONFIG_DIR, file)
const exists = file => fs.exists(resovle(file))
const read = file => fs.readFile(resovle(file), 'utf-8')
const write = (file, content) => fs.writeFile(resovle(file), content, 'utf-8')
function printInfo(data) {
	console.log(
		`Your Warp credentials are located at "${resovle('data.json')}", and WireGuard connection file is "${resovle(
			'wireguard.conf'
		)}".`
	)
	console.log(`You currently have ${data.account.quota / 1000000000}GB Warp+ quora.`)
	console.log('To get your current Warp+ quora, simply run "cf-warp".')
	console.log('To increase your Warp+ quora by 10 GB, simply run "cf-warp 10".')
}
async function init() {
	console.log('Initializing Warp credentials...\n')
	const keys = await generate()
	const data = await register(keys)
	await ref(data) // enable Warp+
	const combined = Object.assign({}, keys, data, await info(data))
	await write('data.json', JSON.stringify(combined, null, 2))
	await write('wireguard.conf', conf(combined))
	printInfo(combined)
}
;(async () => {
	const [dE, wE] = await Promise.all([exists('data.json'), exists('wireguard.conf')])
	if (!dE) {
		// regenerate if data.json doesn't exists
		return init()
	}
	const data = JSON.parse(await read('data.json'))
	if (!wE) {
		console.log('wireguard.conf missing but data.json exists, regenerate a wireguard.conf')
		await write('wireguard.conf', conf(data))
	}
	const n = parseInt(args[0])
	if (!isNaN(n)) {
		console.log(`Prepare faking Warp+ referrer for ${n} times.`)
		for (let i = 1; i <= n; i++) {
			await ref(data)
			console.log(`#${i} fake referrer finished`)
		}
		console.log()
	}
	const newData = await info(data)
	printInfo(newData)
})()
