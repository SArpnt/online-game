var socket = io()
socket.on('message', function (data) {
	console.log(data)
})
/*
function ping() {
	let pingTime = performance.now()
	socket.emit('ping')
	socket.on('ping', function () {
		if (pingTime) {
			console.log('ping: ' + (performance.now() - pingTime))
			pingTime = false
		}
	})
}
*/
addEventListener('mousemove', ({ pageX: x, pageY: y }) => {
	socket.emit('mouse', { x, y })
})

window.onresize = function (event) {
	console.log(event)
}