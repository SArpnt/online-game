module.exports = function (io) {
	
	const playerDataDefault = {
		mouse: { x: 0, y: 0 },
		color: '#ffffff',
		size: { x: 10, y: 10 }
	}
	var playerData = {}

	io.on('connection', socket => {
		console.log(`Client join: ${socket.id}`)
		playerData[socket.id] = playerDataDefault
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
			playerData[socket.id] = data
		})
	})
	function update() {
		io.emit('playerData', playerData)
	}
	setInterval(update, 8) //125 tps
}