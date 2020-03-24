module.exports = function (io) {
	var playerData = {}
	io.on('connection', socket => {
		console.log(`Client join: ${socket.id}`)
		playerData[socket.id] = {
			mouse: { x: 0, y: 0 }
		}
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
		socket.on('mouse', d => {
			playerData[socket.id].mouse = d
		})
	})
	function update() {
		io.emit('playerData', playerData)
	}
	setInterval(update, 8) //125 tps
}