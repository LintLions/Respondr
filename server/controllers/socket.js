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
      
      // to update beacon after mission canceled
      websocket.to(currentSession.beacon).emit('updateBeacon', currentSession);
      console.log('+++socket.js - getHelp - currentSession.beacon(CANCELED): ', currentSession.beacon);
    } else { 
      currentSession = new ActiveBeaconSession(UID, beacon.socket, beacon.location); 
      activeBeaconSessions[UID++] = currentSession; 
      console.log('+++socket.js - getHelp - currentSession(NEW): ', currentSession);
    }

    dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {            
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
      websocket.to(activeBeaconSessions[responder.UID].beacon).emit('verifyResponder', activeBeaconSessions[responder.UID]);
    } else {
      // this is when the beacon is ALREADY taken 
      socket.emit('verifyBeacon', activeBeaconSessions[responder.UID]);
    }
  })

  socket.on('new message', (eachMessage) => {
    console.log('+++in socket.js - new message - message: ', eachMessage.message);
    activeBeaconSession.messages.unshift(eachMessage);
    console.log('+++in socket.js - PUSH - messages: ', activeBeaconSession.messages);
    websocket.to(activeBeaconSession.beacon).emit('render all messages', activeBeaconSession.messages);
    websocket.to(activeBeaconSession.responder).emit('render all messages', activeBeaconSession.messages);
  })

  socket.on('get all messages', () => {
    console.log('+++in socket.js - get all messages - messages: ', activeBeaconSession.messages);
    socket.emit('render all messages', activeBeaconSession.messages);
  })

  socket.on('deleteSession', (beacon) => {
    console.log('+++in socket.js - deleteSession');
    let responder;

    for(var session in activeBeaconSessions) {
      if(beacon.socket === activeBeaconSessions[session].beacon) {
        console.log('+++in socket.js - deleteSession - activeBeaconSessions[session]: ', activeBeaconSessions[session]);
        responder = activeBeaconSessions[session].responder;
        console.log('+++in socket.js - deleteSession - responder: ', responder);
        delete activeBeaconSessions[session];
      }
    }

    if(responder) {
      websocket.to(responder).emit('cancelMission');
    } else {
      dynamicResponder.findAll()
      .then((responders) => {
        if (Array.isArray(responders)) {
          responders.forEach((responder) => {            
            if(responder.socket !== beacon.socket) {  
              console.log('+++socket.js - deleteSession - responder.socket: ', responder.socket);
              websocket.to(responder.socket).emit('cancelMission');
            }
          });
        } else if (responders) {
          console.log(responders.id);
          if(responder.socket !== beacon.socket) {  
            websocket.to(responders.socket).emit('cancelMission');
          }
        } else {
          console.log('no responder for gethelp');
        }
      });
    }
  })

  socket.on('missionComplete', (responder) => {
    console.log('+++in socket.js - missionComplete');

    let beacon = activeBeaconSessions[responder.UID].beacon;
    console.log('+++in socket.js - missionComplete - activeBeaconSessions[responder.UID]: ', activeBeaconSessions[responder.UID]);
    console.log('+++in socket.js - missionComplete - beacon: ', beacon);
    websocket.to(beacon).emit('missionComplete');
  })
});

module.exports = {
  websocket,
  socketio,
  server,
};
