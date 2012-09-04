http     = require 'http'
express  = require 'express'
socketio = require 'socket.io'

app = express()
app.configure ->
    app.use express.static "#{__dirname}"

server = http.createServer(app)

io = socketio.listen server

players = []

io.sockets.on 'connection', (socket) ->

    socket.on 'passBall', (data) ->
        console.log 'pass', data
        socket.broadcast.emit 'getBall', data

server.listen 8000
