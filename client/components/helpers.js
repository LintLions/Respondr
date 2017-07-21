'user strict';

import { AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { store } from '../index';
import { url } from './config';
import { updateBeacon, acceptBeacon, updateLocation } from '../actions/actions';

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
}

export const getToken =  async () => AsyncStorage.getItem('id_token');

export const socket = SocketIOClient(url);

socket.on('newBeacon', (activeBeacon) => { 
  console.log('+++helpers.js - rcvd newBeacon: ', activeBeacon);
  store.dispatch(updateBeacon({
    chatRoom: activeBeacon.id, 
    location: activeBeacon.loc, 
    region: {
      latitude: activeBeacon.loc[0], 
      longitude: activeBeacon.loc[1], 
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }));
});

socket.on('render all messages', (messages) => {
  console.log('+++render all messages listening: ', messages);
  store.dispatch(updateBeacon({
    chatMessages: messages,
  }))
});


export const startLocationUpdate = (token) => {
  return () => {
    console.log('intervalCB looping')
    const locChange = ({ coords }) => {
      console.log(coords.latitude)
      store.dispatch(updateLocation([coords.latitude, coords.longitude], token))
    };
    navigator.geolocation.getCurrentPosition(locChange, error => console.log('error watching position', error), { maximumAge: 1000 });
  };
}
