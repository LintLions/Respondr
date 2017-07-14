const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');

const websocket = socketio(server);
const socketUsers = [];

websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
});

module.exports = {
  websocket,
  socketio,
  socketUsers,
  server,
};
