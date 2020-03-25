"use strict"
var socket = io()
const canvas = $('#canvas')[0]
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
	socket.on('pong', function (ms) {
		$('#ping')[0].innerHTML = ms
	})
	canvas.onmousemove = ({ x, y }) => {
		x -= canvas.offsetLeft
		y -= canvas.offsetTop
		self.mouse = { x, y }
		socket.emit('updateData', self)
	}
	{
		let fpsC = performance.now()
		let fpsD = 0
		function draw() {
			ctx.fillStyle = "#000000"
			ctx.fillRect(0, 0, 800, 500)
			for (let id in playerData) {
				let d = playerData[id]
				ctx.fillStyle = (id == socket.id ? '#ff0000' : d.color)
				ctx.fillRect(d.mouse.x, d.mouse.y, d.size.x, 10)
			}
			ctx.fillStyle = '#00ff00'
			ctx.fillRect(self.mouse.x, self.mouse.y, self.size.x, self.size.y)

			fpsD = Math.round((1000 / (performance.now() - fpsC) + fpsD) / 2)
			$('#fps')[0].innerHTML = fpsD
			fpsC = performance.now()
			requestAnimationFrame(draw)
		}
		requestAnimationFrame(draw)
	}
}

socket.on('playerData', init)