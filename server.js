var app = require('http').createServer(),
    debug = require('debug')('game-backend:server'),
    math = require('mathjs'),
    players=[],
    io = require('socket.io').listen(app, { log: true });

app.listen(3000);

io.sockets.on('connection', function (socket) {
    var points = {
        'x': [ 0, 228, 456, 684, 752, 1000 ],
        'y': [ 240, 240, 240, 240, 240, 240 ]
    };

    var py = points.y;
    for (var i = 0; i < py.length; i++)
    {
        py[i] = math.random(32, 900);
    }

    var player = { id: socket.id , path: points };

    socket.emit('playerConnected', player);
});