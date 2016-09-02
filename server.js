var app = require('./app/express'),
    debug = require('debug')('game-backend:server'),
    http = require('http'),
    WebSocketServer = require('websocket').server;


var port = process.env.PORT || 3000;
app.set('port', port);

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    // var connection = request.accept('echo-protocol', request.origin);
    //
    // console.log((new Date()) + ' Connection accepted.');
    //
    // connection.on('message', function(message) {
    //     if (message.type === 'utf8') {
    //         console.log('Received Message: ' + message.utf8Data);
    //         connection.sendUTF(message.utf8Data);
    //     }
    //     else if (message.type === 'binary') {
    //         console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
    //         connection.sendBytes(message.binaryData);
    //     }
    // });
    //
    // connection.on('close', function(reasonCode, description) {
    //     console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    // });

    var connectionTrain = request.accept('echo-protocol', request.origin);

    console.log((new Date()) + ' Connection accepted.');

    connectionTrain.on('message', function(message) {

        console.log('Sending data');
        connectionTrain.sendUTF('50');

    });

    connectionTrain.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connectionTrain.remoteAddress + ' disconnected.');
    });

});