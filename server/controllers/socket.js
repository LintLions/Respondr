const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const dynamicResponder = require('../db/models/dynamicResponders');
const beacon = require('../db/models/beacons');

const websocket = socketio(server);
const beaconSessions = [];

websocket.on('connection', (socket) => {
  console.log('+++A client just joined on socket.id:', socket.id);
  
  beacon.create({
    socket: socket.id
  });
  
  // >>>>>> to test if socket.id is actually created
  beacon.find({socket: socket.id})
    .then((beacon) => {
      console.log('+++beacon in socket.js: ', beacon);
      console.log('+++socket in socket.js: ', socket);
    })
  // <<<<<< to test if socket.id is actually created

  socket.on('updateUser', (options) => {
    console.log('+++options.query: ', options.query);
    dynamicResponder.find({ where: options.query })
      .then((responder) => {
        if (responder) {
          responder.update({ socket: socket.id })
            .then(updatedResponder => socket.emit('updateUser', updatedResponder));
        } else {
          socket.emit('updateUser', { socket: socket.id });
        }
      });
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

  socket.on('getHelp', (activeBeacon) => {
    console.log('+++server rcvd help request', activeBeacon); // loc is an array of [lat, long]
    // TODO: 
    // create beacon session with new room ID
    // find responder to pair with beacon
    
    dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {
            console.log(responder.socket);
            if (responder.socket !== socket.id) { // OR responder.socket !== activeBeacon.id ???
              // TODO: add room data 
              // should be given loc, AND chatroom! 
              // send bigger object next line 
              socket.to(responder.socket).emit('newBeacon', activeBeacon);
            }
          });
        } else if (responders) {
          console.log(responders.id);
          if (responders.socket !== socket.id) { // OR responder.socket !== activeBeacon.id ???
            socket.to(responders.socket).emit('newBeacon', activeBeacon);
          }
        } else {
          console.log('no responder for gethelp');
        }
      });
  });

  socket.on('acceptBeacon', (chatRoom) => {
    // to check to see if responder is the first,
    // see if chatroom id exists already
    // if chatroom id exists -> not first
    // if chatroom id doesn't exist -> first, set up chatroom 
    socket.join(chatRoom);
  })
});


module.exports = {
  websocket,
  socketio,
  server,
};
