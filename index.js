"use strict"
var port = process.env.PORT || 6980
// Dependencies
var vm = require("vm");
var fs = require("fs");
var express = require('express')
var http = require('http')
var path = require('path')
var socketIO = require('socket.io'); var app = express()
var server = http.Server(app)
var io = socketIO(server)
app.set('port', port)
app.use('/', express.static(__dirname + '/')) //sends files on request
server.listen(port, function () {
	console.log(`Starting server on port: ${port}, directory: ${__dirname}`)
})
// get server
var data = fs.readFileSync('./scripts/server.js');
const script = new vm.Script(data);
script.runInThisContext();
// Run server
main(io,true)