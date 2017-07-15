'user strict';

import { AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import config from './config';


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

export const socket = SocketIOClient(config.url);
socket.on('newBeacon', (data) => {
  console.log('hello', data);
  // TODO this.setState({ beaconLocation: data });
});

