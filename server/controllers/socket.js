const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');

const dynamicResponder = require('../db/models/dynamicResponders');
const beacon = require('../db/models/beacons');

const websocket = socketio(server);
const activeBeaconSession = {
  beacon: '',
  responder: '',
  chatRoom: '',
  messages: [],
};

websocket.on('connection', (socket) => {
  console.log('+++A client just joined on socket.id:', socket.id);
  
  beacon.create({
    socket: socket.id
  });  

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
      // if yes and isResponder -> ask beacon if they still need help
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
    console.log('+++server rcvd help request, activeBeacon: ', activeBeacon); 
    activeBeaconSession.beacon = activeBeacon.id;

    dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {
            console.log('+++responder.socekt: ', responder.socket);
            if (responder.socket !== socket.id) { // OR responder.socket !== activeBeacon.id ???
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
    
    // const chatRoom = activeBeacon.id;
    // socket.join(chatRoom);
  });

  socket.on('acceptBeacon', (chatRoom) => {
    console.log('+++in socket.js - acceptBeacon - chatRoomID: ', chatRoom);
    activeBeaconSession.responder = socket.id; 
    activeBeaconSession.chatRoom = chatRoom; 
    console.log('+++in socket.js - activeBeacon object: ', activeBeaconSession);
    socket.join(chatRoom);

    socket.to(chatRoom).emit('render all messages', activeBeaconSession.messages);
  })

  socket.on('new message', (eachMessage) => {
    console.log('+++in socket.js - new message - message: ', eachMessage.message);
    activeBeaconSession.messages.unshift(eachMessage);
    console.log('+++in socket.js - PUSH - messages: ', activeBeaconSession.messages);
    websocket.to(activeBeaconSession.beacon).emit('render all messages', activeBeaconSession.messages);
    websocket.to(activeBeaconSession.responder).emit('render all messages', activeBeaconSession.messages);

    // socket.emit('render all messages', activeBeaconSession.messages);
    // websocket.to(eachMessage.chatRoom).emit('render all messages', activeBeaconSession.messages);
    // socket.broadcast.emit('render all messages', activeBeaconSession.messages); // ???
    // socket.to(eachMessage.chatRoom).emit('render all messages', activeBeaconSession.messages);
  })

  socket.on('get all messages', () => {
    console.log('+++in socket.js - get all messages - messages: ', activeBeaconSession.messages);
    socket.emit('render all messages', activeBeaconSession.messages);
  })

});


module.exports = {
  websocket,
  socketio,
  server,
};
