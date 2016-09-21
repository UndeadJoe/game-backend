var app = require('http').createServer(),
    debug = require('debug')('game-backend:server'),
    math = require('mathjs'),
    players = [],
    io = require('socket.io').listen(app, { log: true }),
    gameMap = require('./app/map.js');

app.listen(3000);

var map = new gameMap.Map();
map.create();

io.sockets.on('connection', function (socket) {

    var player = { id: socket.id , path: map.path };

    socket.emit('playerConnected', player);
});