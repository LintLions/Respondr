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
    this.responder = '';
    this.responderName = '';
    this.responderLocation = '';
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

  socket.on('getHelp', (options) => {
    console.log('+++server rcvd help request, options: ', options); 
    // console.log('+++server rcvd help request, activeBeacon: ', activeBeacon); 
    // socket server storage
    // activeBeaconSessions[UID] = {};
    // activeBeaconSessions[UID].beacon = activeBeacon.id;
    // activeBeaconSessions[UID].beaconLocation = activeBeacon.loc;
    // activeBeaconSessions[UID].chatRoom = UID;
    // console.log('+++socket.js - getHelp - activeBeaconSessions[UID]: ', activeBeaconSessions[UID]); 
    
    let currentSession = {};

    if(options.UID) {
      currentSession = activeBeaconSessions[options.UID];
      blacklistedResponder = currentSession.responder
      currentSession.responder = '',
      currentSession.blacklist.push(blacklistedResponder)
    } else {
      currentSession = new ActiveBeaconSession(UID, socket.id, options.location); 
      activeBeaconSessions[UID++] = currentSession; 
    }
    console.log('+++socket.js - getHelp - currentSession: ', currentSession);

    // activeBeaconSession.beacon = activeBeacon.id;
    // activeBeaconSession.beaconLocation = activeBeacon.loc;
    // activeBeaconSession.chatRoom = UID;
    // activeBeaconSessions.push(activeBeaconSession);
    // UID++;

    dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {
            console.log('+++responder.socket: ', responder.socket);
            if (responder.socket !== socket.id) { 
              socket.to(responder.socket).emit('newBeacon', currentSession);
            }
          });
        } else if (responders) {
          console.log(responders.id);
          if (responders.socket !== socket.id) { 
            socket.to(responders.socket).emit('newBeacon', currentSession);
          }
        } else {
          console.log('no responder for gethelp');
        }
      });
    
    // const chatRoom = activeBeacon.id;
    // socket.join(chatRoom);
  });

  socket.on('acceptBeacon', (responder) => {
    console.log('+++in socket.js - acceptBeacon - responder: ', responder);
    // activeBeaconSession.responder = responder.responderId; 
    // activeBeaconSession.responderName = responder.responderName; 
    // activeBeaconSession.responderLocation = responder.responderLocation;
    // console.log('+++in socket.js - acceptBeacon - activeBeaconSession: ', activeBeaconSession);
    
    let UID = responder.UID;
    activeBeaconSessions[UID].responder = responder.responderId;

  // store.dispatch(updateBeacon({
  //   isAssigned: true,
  //   isCompleted: false,
  //   location: myBeacon.location,
  //   chatRoom: myBeacon.chatRoom, 
  //   chatMessages: myBeacon.chatMessages,
  // }))

    const myBeacon = {
      location: activeBeaconSession[UID].beaconLocation,
      chatRoom: activeBeaconSessions[UID].chatRoom,
      chatMessages: activeBeaconSessions[UID].chatMessages,
    }    
    const myResponder = {
      chatRoom: activeBeaconSession.chatRoom,
      name: activeBeaconSession.responderName,
      location: activeBeaconSession.responderLocation,
    }

    // socket.join(activeBeaconSession.chatRoom);
    // websocket.to(activeBeaconSession.chatRoom).emit('verifyBeacon', myBeacon);

    // websocket.to(activeBeaconSession.beacon).emit('verifyResponder', myResponder);
    // websocket.to(activeBeaconSession.responder).emit('verifyBeacon', myBeacon);

    socket.emit('verifyBeacon', myBeacon);
    socket.to(activeBeaconSession.beacon).emit('verifyResponder', myResponder);
  })

  socket.on('newGetHelp', (responderId) => {
    activeBeaconSession.responder = 'null';
    console.log('+++in socket.js - newGetHelp - responderId: ', responderId);
    activeBeaconSession.blacklist.push(responderId);
    console.log('+++in socket.js - newGetHelp - blacklist: ', activeBeaconSession.blacklist);

    dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {
            console.log('+++responder.socket: ', responder.socket);
            if (responder.socket !== socket.id && activeBeaconSession.blacklist.indexOf(responder.socket) === -1) { 
              console.log('+++in socket.js - newGetHelp - new responders: ', responder.socket);
              socket.to(responder.socket).emit('newBeacon', activeBeaconSession);
            }
          });
        } else if (responders) {
          if (responder.socket !== socket.id && activeBeaconSession.blacklist.indexOf(responder.socket) === -1) {
            socket.to(responders.socket).emit('newBeacon', activeBeaconSession);
          }
        } else {
          console.log('no responder for gethelp');
        }
      });

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
