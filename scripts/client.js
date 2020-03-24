var socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var playerData = {}

socket.on('message', function (data) {
	console.log(data)
})
socket.on('playerData', function (data) {
	playerData = data
})
function draw() {
	ctx.fillStyle = "#ffff00"
	ctx.fillRect(0, 0, 800, 500)
	ctx.fillStyle = "#000000"
	for (id in playerData) {
		let pos = playerData[id].mouse
		ctx.fillRect(pos.x, pos.y, 10, 10)
	}
	requestAnimationFrame(draw)
}
requestAnimationFrame(draw)
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
canvas.onmousemove = ({ x, y }) => {
	x -= canvas.offsetLeft
	y -= canvas.offsetTop
	socket.emit('mouse', { x, y })
}

window.onresize = function (event) {
	console.log(event)
}