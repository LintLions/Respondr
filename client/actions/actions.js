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
export const goBack = () => {
  return {
    type: 'BACK',
  }
};
export const goHome = () => {
  console.log("going Home");
  return {
    type: 'HOME'
  }
};

export const updateHelp = () => ({
  type: 'GET_HELP',
  isBeacon: true,
});
export const setChatRoom = (activeBeaconSocketID) => ({
  type: "SET_CHAT_ROOM",
  chatRoom: activeBeaconSocketID
})
export const getHelp = () => (dispatch) => {
  const activeBeaconSocketID = store.getState().user.socket;
  const activeBeaconLoc = store.getState().user.location;
  const activeBeacon = {
    id: activeBeaconSocketID, // this will be used at the chatRoom id 
    loc: activeBeaconLoc
  }
  socket.emit('getHelp', activeBeacon);
  dispatch(updateHelp);
  dispatch(setChatRoom(activeBeaconSocketID));
};

export const acceptBeacon = () => (dispatch) => {
  const chatRoom = store.getState().myBeacon.chatRoom; 
  const beaconTaken = !!chatRoom; 
  if(!beaconTaken) {
    socket.emit('acceptBeacon', chatRoom);
  } else {
    dispatch(updateBeacon({ location: null, completed: true })); // OR create another action 'BEACON_SAVED'???
  }
  // to check to see if responder is the first,
  // see if chatroom id exists already
  // if chatroom id exists -> not first
  // if chatroom id doesn't exist -> first, set up chatroom 
}

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

export const signUp = userData => (dispatch) => {
  console.log("userData is ", userData);
  fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: userData,
  })
    .then(response => response.json())
    .then((responseData) => {
      console.log("response Data is ", responseData);
      if (responseData.success) {
        updateToken(responseData.newUser.token);
        AlertIOS.alert("Signup Success!", responseData.id_token);
        dispatch(logInSuccess(responseData.newUser));
      } else {
        AlertIOS.alert("Signup Failed!", responseData.error);
      }
    })
    .done();
};
