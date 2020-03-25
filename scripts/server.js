"use strict"
var isObject = x => x !== null && typeof x === 'object'
var playerData
class player {
	constructor() {
		this.mouse = { x: 0, y: 0 }
		this.color = '#ffffff'
		this.size = { x: 10, y: 10 }
	}
}
function verifyPlayerData(data, old) {
	if (isObject(data.mouse)) {
		if (data.mouse.x) old.mouse.x = data.mouse.x
		if (data.mouse.y) old.mouse.y = data.mouse.y
	}
	if (/^#[0-9a-f]{6}$/i.exec(data.color)) {
		old.color = data.color
	}
	if (isObject(data.size)) {
		if (typeof data.size.x == "number") old.size.x = data.size.x
		if (typeof data.size.x == "number") old.size.y = data.size.y
	}
	return { data: old }
}
function main(io, anticheat) {

	playerData = {}

	io.on('connection', socket => {
		console.log(`Client join: ${socket.id}`)
		playerData[socket.id] = new player
		socket.emit('init', playerData)

		socket.on('disconnect', () => {
			console.log(`Client left: ${socket.id}`)
			delete playerData[socket.id]
		})
		//socket.on('ping', () => {
		//	io.emit('ping')
		//})
		socket.on('message', d => {
			if (typeof d == 'string')
				io.emit('message', d)
		})
		socket.on('selfmessage', d => {
			if (typeof d == 'string')
				socket.emit('message', d)
		})
		socket.on('updateData', data => {
			if (anticheat) {
				let pd = verifyPlayerData(data, playerData[socket.id])
				playerData[socket.id] = pd.data
			}
			else
				playerData[socket.id] = data
		})
	})
	function update() {
		io.emit('playerData', playerData)
	}
	setInterval(update, 8) //125 tps
}