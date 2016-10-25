import app from 'http';
import gameMap from './app/map.js';
import io from 'socket.io';

let port = process.env.PORT || 3000;
let map = new gameMap.Map();
let players = [];

map.create();
app.createServer();
app.listen(port);
io.listen(app, { log: true });

console.log('Server started on port:', port);

io.sockets.on('connection', function (socket) {
  let player = { id: socket.id, path: map.path };
  players.push(player);

  socket.emit('playerConnected', player);

  socket.on('needMap', function () {
    map.generate();
    socket.emit('updateMap', { path: map.getMap() });
  });
});
