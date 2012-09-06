var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

server.listen(8000)

app.configure(function () {
    app.use(express.static(__dirname + '/public'))
})

io.sockets.on('connection', function (socket) {

    // throwball -> getball
    socket.on('throwball', function (data) {
        socket.broadcast.emit('getball', data)
    })

})