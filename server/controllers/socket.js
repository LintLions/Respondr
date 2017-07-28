const app = require('../../index.js');
const server = require('http').createServer(app);
const socketio = require('socket.io');
const db = require('../db/db');
const Push = require('./push');
const radius = 3000;
const dynamicResponder = require('../db/models/dynamicResponders');
const beacon = require('../db/models/beacons');

const websocket = socketio(server);

let UID = 1; // unique ID for each activeBeaconSession

class ActiveBeaconSession {
  constructor({ socket, location, device }) {
    this.chatRoom = UID;
    this.chatMessages = [];
    this.beacon = socket;
    this.beaconLocation = location;
    this.responder = null;
    this.responderName = null;
    this.responderLocation = [];
    this.blacklist = [];
    this.beaconDevice = device;
    this.responderDevice = null;
  }
}

const activeBeaconSessions = {};

websocket.on('connection', (socket) => {
  console.log('+++A client just joined on socket.id:', socket.id);
  beacon.create({
    socket: socket.id,
  });

  socket.on('updateUser', (options) => {
    console.log('+++options.query: ', options.query);
    dynamicResponder.find({ where: options.query })
      .then((responder) => {
        if (responder) {
          const updateOptions = { socket: socket.id };
          Object.assign(updateOptions, options.update);
          responder.update(updateOptions)
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

  socket.on('getHelp', (beacon) => {
    console.log('+++socket.js - getHelp (server rcvd help request) - beacon: ', beacon); 
    
    let currentSession = {};
    let currentLocation = [];

    if(beacon.UID) { 
      currentSession = activeBeaconSessions[beacon.UID];
      blacklistedResponder = currentSession.responder;
      currentSession.responder = null,
      currentSession.responderLocation = [],
      currentSession.blacklist.push(blacklistedResponder);
      console.log('+++socket.js - getHelp - currentSession(CANCELED): ', currentSession);
      
      // to update beacon after mission canceled
      websocket.to(currentSession.beacon).emit('updateBeacon', currentSession);
      // TODO PUSH matching info
      console.log('+++socket.js - getHelp - currentSession.beacon(CANCELED): ', currentSession.beacon);

      currentLocation = [currentSession.beaconLocation[0], currentSession.beaconLocation[1]];
    } else {
      currentSession = new ActiveBeaconSession(beacon);

      // currentLocation = [beacon.location[0], beacon.location[1]];
      currentLocation[0] = currentSession.beaconLocation[0];
      currentLocation[1] = currentSession.beaconLocation[1];
      console.log('+++socket.js - getHelp - currentLocation[0]: ', currentLocation[0]);
      console.log('+++socket.js - getHelp - currentLocation[0]: ', currentLocation[0]);      

      activeBeaconSessions[UID++] = currentSession; 
      console.log('+++socket.js - getHelp - currentSession(NEW): ', currentSession);      
    }

    db
    .query(`select "socket", "device", st_distance_sphere(geometry, ST_MakePoint(${currentLocation[0]}, ${currentLocation[1]})) from "dynamicResponders" WHERE ST_DWithin(geometry, ST_MakePoint(${currentLocation[0]}, ${currentLocation[1]})::geography, ${radius}) AND available = TRUE ORDER BY geometry <-> 'Point(${currentLocation[0]} ${currentLocation[1]})'::geometry`)
    .then((responders) => {
      console.log('responders are ', responders);
      const pushMessage = {
        title: 'Someone Needs Help',
        body: 'Touch here to open the app for more info',
      };
      if (Array.isArray(responders[0])) {
        responders[0].forEach((responder) => {
          console.log('+++responder.socket: ', responder);
          if (responder.socket !== currentSession.beacon && currentSession.blacklist.indexOf(responder.socket) === -1) {
            let timeOut = (responder.st_distance_sphere * 35 * 1000) / radius;
            setTimeout(() => {
              console.log("in setTimeout, timeout is ", timeOut);
              Push.push.send(responder.device, Push.apnData(pushMessage))
                .catch(err => console.error(err));
              socket.to(responder.socket).emit('newBeacon', currentSession);
            }, timeOut);
          }
        });
      } else if (responders) {
        console.log(responders.id);
        if (responders[0].socket !== currentSession.beacon && currentSession.blacklist.indexOf(responders[0].socket) === -1) {
          Push.push.send(responders[0].device, Push.apnData(pushMessage))
            .catch(err => console.error(err));
          socket.to(responders[0].socket).emit('newBeacon', currentSession);
        }
      } else {
        console.log('no responder for gethelp');
      }
    });
  });

  socket.on('acceptBeacon', (responder) => { // UID, responderId, responderLocation 
    console.log('+++in socket.js - acceptBeacon - responder: ', responder);

    const UID = responder.UID;

    if(!activeBeaconSessions[UID].responder) {
      // this is when the beacon HAS NOT BEEN taken yet
      activeBeaconSessions[UID].responder = responder.responderId;
      activeBeaconSessions[UID].responderLocation = responder.responderLocation;
      console.log('+++in socket.js - acceptBeacon - activeBeaconSessions[UID]', activeBeaconSessions[UID]);
      
      // inform RESPONDER that the beacon is assigned 
      socket.emit('verifyBeacon', activeBeaconSessions[UID]);
      
      // inform BEACON that a responder is assigned 
      websocket.to(activeBeaconSessions[UID].beacon).emit('verifyResponder', activeBeaconSessions[UID]);

      // inform REMAINING RESPONDERS that the beacon is ALREADY taken
      dynamicResponder.findAll()
        .then((responders) => {
          if(Array.isArray(responders)) {
            responders.forEach((responder) => {
              if(responder.socket !== activeBeaconSessions[UID].responder) {
                websocket.to(responder.socket).emit('verifyBeacon', activeBeaconSessions[UID]);
              }
            })
          } else if(responders) {
            if(responders.socket !== activeBeaconSessions[UID].responder) {
              websocket.to(responders[0].socket).emit('verifyBeacon', activeBeaconSessions[UID]);
            }            
          }
        })

    } else {
      // this is when the beacon is ALREADY taken 
      socket.emit('verifyBeacon', activeBeaconSessions[UID]);
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
    console.log('+++in socket.js - activeBeaconSession: ', eachMessage.chatMessages[0]);

    const activeBeaconSession = activeBeaconSessions[eachMessage.chatRoom];
    activeBeaconSession.chatMessages.unshift(eachMessage.chatMessages[0]);
    console.log('+++in socket.js - PUSH - messages: ', activeBeaconSession.chatMessages);
    websocket.to(activeBeaconSession.beacon).emit('render all messages', activeBeaconSession.chatMessages);
    websocket.to(activeBeaconSession.responder).emit('render all messages', activeBeaconSession.chatMessages);
  });


  // socket.on('new message', (eachMessage) => {
  //   console.log('+++in socket.js - new message - message: ', eachMessage.message);
  //   activeBeaconSession.messages.unshift(eachMessage);
  //   console.log('+++in socket.js - PUSH - messages: ', activeBeaconSession.messages);
  //   websocket.to(activeBeaconSession.beacon).emit('render all messages', activeBeaconSession.messages);
  //   websocket.to(activeBeaconSession.responder).emit('render all messages', activeBeaconSession.messages);
  // })

  socket.on('get all messages', () => {
    console.log('+++in socket.js - get all messages - messages: ', activeBeaconSession.messages);
    socket.emit('render all messages', activeBeaconSession.messages);
  });

  socket.on('editProfile', (userData) => {
    console.log('+++socket.js - editProfile - userData: ', userData)

    dynamicResponder.findOne({where: {socket: userData.socket}, })
      .then((responder) => {
        console.log('+++socket.js - editProfile - findOne responder?: ', responder)
        for (var key in userData) {
          if(userData[key] !== '' && key !== 'socket') {
            console.log('+++socket.js - editProfile - userData[key]: ', key, userData[key])
            responder[key] = userData[key]
            responder.save()
            .then((updatedResponder) => {
              console.log('+++socket.js - editProfile - updatedResponder: ', updatedResponder)
            })         
          } 
        }        
      }
    )    
    
    // dynamicResponder.findOne({where: {socket: userData.socket}, })
    //   .then((responder) => {
    //     console.log('+++socket.js - editProfile - findOne responder?: ', responder)
    //     for (var key in userData) {
    //       if(userData[key] !== '' && key !== 'socket') {
    //         console.log('+++socket.js - editProfile - userData[key]: ', key, userData[key])
    //         responder.update({
    //           key: userData[key]
    //         }).then((updatedResponder) => {
    //           console.log('+++socket.js - editProfile - updatedResponder: ', updatedResponder)
    //         })         
    //       } 
    //     }        
    //   }
    //   )

    // for (var key in userData) {
    //   if(userData[key] !== '' && key !== 'socket') {
    //     console.log('+++socket.js - editProfile - userData[key]: ', key, userData[key])
    //     dynamicResponder.update({
    //       key: userData[key],
    //     }, {
    //       where: {socket: userData.socket},
    //       returning: true,
    //       plain: true
    //     }).then((updatedResponder) => {
    //       console.log('+++socket.js - editProfile - updatedResponder: ', updatedResponder)
    //     })         
    //   } 
    // }

    // dynamicResponder.update({
    //   organization: userData.organization,
    // }, {
    //   where: {socket: userData.socket},
    //   returning: true,
    //   plain: true
    // }).then((updatedResponder) => {
    //   console.log('+++socket.js - editProfile - updatedResponder: ', updatedResponder)
    // }) 
  });

  //   dynamicResponder.findAll()
  //   .then((responders) => {
  //     if (Array.isArray(responders)) {
  //       responders.forEach((responder) => {                    
  //         if(responder.socket === userData.socket) {  
  //           console.log('+++socket.js - editProfile - responder: ', responder);
  //           // websocket.to(responder.socket).emit('cancelMission');
  //         }
  //       });
  //     } else if (responders) {
  //       console.log(responders.id);
  //       if(responder.socket === userData.socket) {  
  //         console.log('+++socket.js - editProfile - responder: ', responder);
  //         // websocket.to(responders.socket).emit('cancelMission');
  //       }
  //     } else {
  //       console.log('no responder for gethelp');
  //     }
  //   }); 
  // })
});

module.exports = {
  websocket,
  socketio,
  server,
};
