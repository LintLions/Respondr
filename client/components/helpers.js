'user strict';

import { AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { store } from '../index';
import { url } from './config';
import { updateBeacon, acceptBeacon, updateUser, updateMyResponder, updateLocation, updateRoute } from '../actions/actions';

export const decode = (t, e) => {
  // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@...
  // to an array of coordinates
  let n;
  let o;
  let u = 0;
  let l = 0;
  let r = 0;
  let h = 0;
  let i = 0;
  let a = null;
  const d = [];
  const c = (10 ** (e || 5));

  for (;u < t.length;) {
    a = null;
    h = 0;
    i = 0;
    do {
      a = t.charCodeAt(u) - 63;
      u += 1;
      i |= (31 & a) << h;
      h += 5;
    }
    while (a >= 32);
    n = (1 & i) ? (~(i >> 1)) : i >> 1;
    h = 0;
    i = 0;
    do {
      a = t.charCodeAt(u) - 63;
      u += 1;
      i |= (31 & a) << h;
      h += 5;
    }
    while (a >= 32);
    o = (1 & i) ? (~(i >> 1)) : i >> 1;
    l += n;
    r += o;
    d.push([l / c, r / c]);
  }
  return d.map(time => ({ latitude: time[0], longitude: time[1] }));
};

export const updateToken =  async (value) => {
  try {
    await AsyncStorage.setItem('id_token', value);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

export const getToken =  async () => AsyncStorage.getItem('id_token');

export const socket = SocketIOClient(url);


export const startLocationUpdate = (token) => {
  // console.log('looping')
  // if (chatroom) {
  //   console.log('in a chatroom!!')
  //   return () => {
  //     const emitLocChange = ({ coords }) => {
  //     console.log('emitLocChange!: ', coords.latitude);
  //     socket.emit('update location', chatroom, [coords.latitude, coords.longitude]);
  //   };
  //   navigator.geolocation.getCurrentPosition(emitLocChange, error => console.log('error watching position', error), { maximumAge: 1000 });
  //   }
  // } else {
    let counter = 0;
    return () => {
      // console.log(counter++);
        const chatroom = store.getState().myBeacon.chatRoom || store.getState().myResponder.chatRoom;

      console.log('intervalCB looping');
      const locChange = ({ coords }) => {
        // console.log(coords.latitude);
        if (chatroom) {
          console.log(chatroom)
          socket.emit('update location', chatroom, [coords.latitude, coords.longitude])
        }
        store.dispatch(updateLocation([coords.latitude, coords.longitude], token));
      };
      navigator.geolocation.getCurrentPosition(locChange, error => console.log('error watching position', error), { maximumAge: 1000 });
    };
};

socket.on('newBeacon', (currentSession) => { 
  console.log('+++helpers.js - newBeacon - currentSession: ', currentSession);
  store.dispatch(updateBeacon({
    UID: currentSession.chatRoom,
    isAssigned: false,
    isCompleted: false,
    location: currentSession.beaconLocation, 
    region: {
      latitude: currentSession.beaconLocation[0],
      longitude: currentSession.beaconLocation[1],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }));
});

socket.on('verifyBeacon', (currentSession) => {
  console.log('+++helpers.js - verifyBeacon - currentSession: ', currentSession);

  if(currentSession.responder === socket.id) {
    store.dispatch(updateBeacon({
      isAssigned: true,
      // isCompleted: false,
      // location: currentSession.beaconLocation,
      chatRoom: currentSession.chatRoom, 
      chatMessages: currentSession.chatMessages, 
    }))  
  } else {
    store.dispatch(updateBeacon({
      // isAssigned: false,
      location: null,
    }))  
  }

  console.log('+++helpers.js - verifyBeacon - myBeacon: ', store.getState().myBeacon);
})

socket.on('verifyResponder', (currentSession) => {
  console.log('+++helpers.js - verifyResponder - currentSession: ', currentSession);

  store.dispatch(updateMyResponder({ 
    name: currentSession.responderName,
    location: currentSession.responderLocation,
    chatRoom: currentSession.chatRoom,
    chatMessages: currentSession.chatMessages,
   }));
  console.log('+++helpers.js - verifyBeacon - myResponder: ', store.getState().myResponder);
})

socket.on('updateBeacon', (currentSession) => {
  console.log('+++helpers.js - updateBeacon - currentSession: ', currentSession);

  store.dispatch(updateMyResponder({
    reAssigned: true,
    name: null,
    location: null,
    chatRoom: null,
    chatMessages: null,
  }))
  console.log('+++helpers.js - updateBeacon - myResponder: ', store.getState().myResponder);
})

socket.on('cancelMission', () => {
  console.log('+++helpers.js - cancelMission');

  store.dispatch(updateBeacon({
    isAssigned: false,
    isCompleted: true,
  }))
  store.dispatch(updateRoute(null))
})

socket.on('render all messages', (messages) => {
  console.log('+++render all messages listening: ', messages);
  store.dispatch(updateBeacon({
    chatMessages: messages,
  }))
});

socket.on('missionComplete', () => {
  console.log('+++helpers.js - missionComplete');

  store.dispatch(updateMyResponder({
    missionComplete: true,
  }))

  console.log('+++helpers.js - missionComplete - myResponder: ', store.getState().myResponder);
  store.dispatch(updateRoute(null))
});

socket.on('update location', (chatroom, location) => {
  if (store.getState().user.isBeacon) {
    store.dispatch(updateMyResponder({
      location,
    }));
  } else {
    store.dispatch(updateBeacon({
      location,
    }));
  }
});

