// Dependencies
var express = require('express')
var http = require('http')
var path = require('path')
var socketIO = require('socket.io'); var app = express()
var server = http.Server(app)
var io = socketIO(server); app.set('port', 6980)
app.use('/static', express.static(__dirname + '/static'))// Routing
app.get('/', function (request, response) {
	response.sendFile(path.join(__dirname, 'index.html'))
})// Starts the server.
server.listen(6980, function () {
	console.log('Starting server on port 6980')
})
// Add the WebSocket handlers
io.on('connection', function (socket) {
	socket.on('message', d => {
		if (typeof d == 'string')
			io.sockets.emit('message', d)
	})
})
