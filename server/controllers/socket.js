const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const dynamicResponder = require('../db/models/dynamicResponders');
const beacon = require('../db/models/beacons');

const websocket = socketio(server);
const beaconSessions = [];

websocket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  beacon.create({
    socket: socket.id,
  });

  socket.on('disconnect', () => {
    // check if socket is in a beacon session
      // if yes and isREsponder -> ask beacon if they still need help
        // if yes then rerun getHelp functionality
        // if no then remove session
      // if yes and isBeacon ->
        // remove session
          // update responder

    // remove from beacon store
    beacon.destroy({ where: { socket: socket.id } })
    .then(rows => console.log(`deleted ${rows} rows`));
  });

  socket.on('getHelp', (loc) => {
    console.log('server rcvd help request', loc);
    // create beacon session with new room ID
    // find responder to pair with beacon
    dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {
            console.log(responder.socket);
            if (responder.socket !== socket.id) {
              // TODO: add room data
              socket.to(responder.socket).emit('newBeacon', loc);
            }
          });
        } else if (responders) {
          console.log(responders.id);
          if (responders.socket !== socket.id) {
            socket.to(responders.socket).emit('newBeacon', loc);
          }
        } else {
          console.log('no responder for gethelp');
        }
      });
  });
  socket.on('updateUser', (token) => {
    dynamicResponder.find({ where: { token } })
      .then(responder => responder.update({ socket: socket.id }));
  });
});


module.exports = {
  websocket,
  socketio,
  socketUsers,
  server,
};
