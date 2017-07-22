const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');

const dynamicResponder = require('../db/models/dynamicResponders');
const beacon = require('../db/models/beacons');

const websocket = socketio(server);

let UID = 1; // unique ID for each activeBeaconSession 

class ActiveBeaconSession {
  constructor(UID, socket, location) {
    this.chatRoom = UID;
    this.chatMessages = [];
    this.beacon = socket;
    this.beaconLocation = location;
    this.responder = null;
    this.responderName = null;
    this.responderLocation = [];
    this.blacklist = [];
  }
}

const activeBeaconSessions = {};

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

  socket.on('getHelp', (beacon) => {
    console.log('+++socket.js - getHelp (server rcvd help request) - beacon: ', beacon); 
    
    let currentSession = {};

    if(beacon.UID) { 
      currentSession = activeBeaconSessions[beacon.UID];
      blacklistedResponder = currentSession.responder
      currentSession.responder = null,
      currentSession.responderLocation = [],
      currentSession.blacklist.push(blacklistedResponder)
      console.log('+++socket.js - getHelp - currentSession(CANCELED): ', currentSession);
    } else { 
      currentSession = new ActiveBeaconSession(UID, beacon.socket, beacon.location); 
      activeBeaconSessions[UID++] = currentSession; 
      console.log('+++socket.js - getHelp - currentSession(NEW): ', currentSession);
    }

    dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {            
            // if (responder.socket !== socket.id) { 
            // if (responder.socket !== socket.id && activeBeaconSession.blacklist.indexOf(responder.socket) === -1) {
            if(responder.socket !== currentSession.beacon && currentSession.blacklist.indexOf(responder.socket) === -1) {  
              console.log('+++responder.socket: ', responder.socket);
              socket.to(responder.socket).emit('newBeacon', currentSession);
            }
          });
        } else if (responders) {
          console.log(responders.id);
          if(responder.socket !== currentSession.beacon && currentSession.blacklist.indexOf(responder.socket) === -1) {  
            socket.to(responders.socket).emit('newBeacon', currentSession);
          }
        } else {
          console.log('no responder for gethelp');
        }
      });
  });

  socket.on('acceptBeacon', (responder) => {
    console.log('+++in socket.js - acceptBeacon - responder: ', responder);

    if(!activeBeaconSessions[responder.UID].responder) {
      // this is when the beacon HAS NOT BEEN taken yet
      activeBeaconSessions[responder.UID].responder = responder.responderId;
      activeBeaconSessions[responder.UID].responderLocation = responder.responderLocation;
      console.log('+++in socket.js - acceptBeacon - activeBeaconSessions[responder.UID]', activeBeaconSessions[responder.UID]);
      
      socket.emit('verifyBeacon', activeBeaconSessions[responder.UID]);
    } else {
      // this is when the beacon is ALREADY taken 
      socket.emit('verifyBeacon', activeBeaconSessions[responder.UID]);
    }

  //   console.log('+++in socket.js - acceptBeacon - responder: ', responder);
  //   // activeBeaconSession.responder = responder.responderId; 
  //   // activeBeaconSession.responderName = responder.responderName; 
  //   // activeBeaconSession.responderLocation = responder.responderLocation;
  //   // console.log('+++in socket.js - acceptBeacon - activeBeaconSession: ', activeBeaconSession);
    
  //   let UID = responder.UID;
  //   activeBeaconSessions[UID].responder = responder.responderId;

  // // store.dispatch(updateBeacon({
  // //   isAssigned: true,
  // //   isCompleted: false,
  // //   location: myBeacon.location,
  // //   chatRoom: myBeacon.chatRoom, 
  // //   chatMessages: myBeacon.chatMessages,
  // // }))

  //   const myBeacon = {
  //     location: activeBeaconSession[UID].beaconLocation,
  //     chatRoom: activeBeaconSessions[UID].chatRoom,
  //     chatMessages: activeBeaconSessions[UID].chatMessages,
  //   }    
  //   const myResponder = {
  //     chatRoom: activeBeaconSession.chatRoom,
  //     name: activeBeaconSession.responderName,
  //     location: activeBeaconSession.responderLocation,
  //   }

  //   // socket.join(activeBeaconSession.chatRoom);
  //   // websocket.to(activeBeaconSession.chatRoom).emit('verifyBeacon', myBeacon);

  //   // websocket.to(activeBeaconSession.beacon).emit('verifyResponder', myResponder);
  //   // websocket.to(activeBeaconSession.responder).emit('verifyBeacon', myBeacon);

  //   socket.emit('verifyBeacon', myBeacon);
  //   socket.to(activeBeaconSession.beacon).emit('verifyResponder', myResponder);
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
