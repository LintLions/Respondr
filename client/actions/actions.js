import { AlertIOS, AsyncStorage } from 'react-native';
import {
  googleMapsDirectionsApiKey as APIKEY,
  url,
 } from '../components/config';
import { updateToken, socket, decode } from '../components/helpers';
import { store } from '../index';

export const updateBeacon = options => ({
  type: 'UPDATE_BEACON',
  options,
});

export const updateHelp = () => ({
  type: 'GET_HELP',
  isBeacon: true,
});
export const getHelp = () => (dispatch) => {
  const helpLoc = store.getState().user.location;
  socket.emit('getHelp', helpLoc);
  dispatch(updateHelp);
};

export const getCurrentLocation = location => ({
  type: 'GET_CURRENT_LOCATION',
  location,
});


export const cancelHelp = () => ({
  type: 'CANCEL_HELP',
  isBeacon: false,
});

export const logInSuccess = (userData) => {
  console.log('userData ', userData);
  return {
    type: 'LOGIN_SUCCESS',
    userData,
  };
};

export const logIn = (options) => {
  const socketID = store.getState().user.socket;
  return (dispatch) => {
    fetch(`${url}/users/sessions/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json',
      },
      body: JSON.stringify({
        ...options,
        socket: socketID,
      }),
    })
      .then(response => response.json())
      .then((responseData) => {
        if (responseData.user) {
          updateToken(responseData.user.token);
          dispatch(logInSuccess(responseData.user));
          AlertIOS.alert('Login Success!');
        } else {
          AlertIOS.alert('Login Failed!', responseData.error);
        }
      }).done();
  };
};

export const logOut = () => ({
  type: 'LOGOUT',
});

export const getUserWithTokenAndSocket = () => (dispatch) => {
  AsyncStorage.getItem('id_token', (err, value) => {
    if (err) {
      console.error('error getting session from phone storage ', err);
    }
    socket.emit('updateUser', {
      query: {
        token: value,
      },
    });
    socket.on('updateUser', data => dispatch(logInSuccess(data)));
  });
};

export const updateRoute = route => ({
  type: 'UPDATE_ROUTE',
  route,
});

export const drawRoute = latLong => (dispatch) => {
  const mode = 'walking';
  const origin = `${store.getState().user.location[0]},${store.getState().user.location[1]}`;
  const dest = latLong
    ? `${latLong[0]},${latLong[1]}`
    : store.getState().myBeacon.location.join(',');
  const googleUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${APIKEY}&mode=${mode}`;
  fetch(googleUrl)
    .then(response => response.json())
    .then((responseJson) => {
      if (responseJson.routes.length) {
        dispatch(updateRoute(decode(responseJson.routes[0].overview_polyline.points)));
      }
    }).catch(e => console.warn(e));
};
