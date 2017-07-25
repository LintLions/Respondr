const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const db = require('../db/db');

const radius = 3000;
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

  socket.on('update location', (chatroom, location) => {
    const activeBeaconSession = activeBeaconSessions[chatroom];
    if (activeBeaconSession) {
      socket.to(activeBeaconSession.beacon).emit('update location', chatroom, location);
      socket.to(activeBeaconSession.responder).emit('update location', chatroom, location);
    }
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
    //need current location
    const currentLocation = [activeBeacon.loc[0], activeBeacon.loc[1]];
    activeBeaconSession.beacon = activeBeacon.id;
    db
    .query(`select "socket", st_distance_sphere(geometry, ST_MakePoint(${currentLocation[0]}, ${currentLocation[1]})) from "dynamicResponders" WHERE ST_DWithin(geometry, ST_MakePoint(${currentLocation[0]}, ${currentLocation[1]})::geography, ${radius}) AND available = TRUE ORDER BY geometry <-> 'Point(${currentLocation[0]} ${currentLocation[1]})'::geometry`)
    .then((responders) => {
      console.log("responders are ", responders);
        if (Array.isArray(responders[0])) {
          responders[0].forEach((responder) => {
            console.log('+++responder.socket: ', responder.socket);
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
