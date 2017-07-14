const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const dynamicResponder = require('../db/models/dynamicResponders');
const beacon = require('../db/models/beacons');

const websocket = socketio(server);
const socketUsers = [];

websocket.on('connection', (socket) => {
  beacon.find({ where: { socket: socket.id } }) // socket.handshake.query
    .then((found) => {
      if (!found) {
        beacon.create({
          socket: socket.id,
        });
      }
    });
  socket.on('disconnect', () => {
    beacon.destroy({ where: { socket: socket.id } })
    .then(rows => console.log(`deleted ${rows} rows`));
  });
  console.log('A client just joined on', socket.id, socket.handshake.query.location);
});

websocket.on('getHelp', (socket) => {
  io.to(socketid).emit('message', 'for your eyes only');
});

module.exports = {
  websocket,
  socketio,
  socketUsers,
  server,
};
