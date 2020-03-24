module.exports = function (io) {
	io.on('connection', socket => {
		console.log(`Client join: ${socket.id}`)
		socket.on('disconnect', () => {
			console.log(`Client left: ${socket.id}`)
		})
		//socket.on('ping', () => {
		//	io.sockets.emit('ping')
		//})
		socket.on('message', d => {
			if (typeof d == 'string')
				io.sockets.emit('message', d)
		})
		socket.on('selfmessage', d => {
			if (typeof d == 'string')
				socket.emit('message', d)
		})
		socket.on('mouse', d => {
			if (typeof d == 'string')
				io.sockets.emit('message', d)
		})
	})
}