var socket = io()
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

var init
var playerData
var self

/*
window.onresize = function (event) {
	console.log(event)
}
*/
function init(data) {
	socket.off('playerData', init)
	playerData = data
	self = playerData[socket.id]

	socket.on('playerData', function (data) {
		playerData = data
	})
	canvas.onmousemove = ({ x, y }) => {
		x -= canvas.offsetLeft
		y -= canvas.offsetTop
		self.mouse = { x, y }
		socket.emit('updateData', self)
	}

	function draw() {
		ctx.fillStyle = "#000000"
		ctx.fillRect(0, 0, 800, 500)
		for (id in playerData) {
			let d = playerData[id]
			ctx.fillStyle = (id == socket.id ? '#ff0000' : d.color)
			ctx.fillRect(d.mouse.x, d.mouse.y, d.size.x, 10)
		}
		ctx.fillStyle = '#00ff00'
		ctx.fillRect(self.mouse.x, self.mouse.y, self.size.x, self.size.y)

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
}

socket.on('playerData', init)