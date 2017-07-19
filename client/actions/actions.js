import { AlertIOS, AsyncStorage } from 'react-native';
import {
  googleMapsDirectionsApiKey as APIKEY,
  url,
 } from '../components/config';
import { updateToken, socket, decode } from '../components/helpers';
import { store } from '../index';

export const animateSuccess = responders => ({
  type: 'UPDATE_RESPONDERS',
  responders,
});

export const animate = location => (dispatch) => {
  console.log("location in animation is ", location);
  const body = JSON.stringify({
    location,
  });

  fetch(`${url}/users/animate`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(animateSuccess(responseJson));
    })
    .catch(e => console.warn(e));
};

export const updateBeacon = options => ({
  type: 'UPDATE_BEACON',
  options,
});
export const updateUser = options => ({
  type: 'UPDATE_USER',
  options,
});
export const goBack = () => ({
  type: 'BACK',
});

export const goHome = () => ({
  type: 'HOME',
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
  return {
    type: 'LOGIN_SUCCESS',
    userData,
  };
};
export const logIn = (options) => {
  const socketID = store.getState().user.socket;
  const body = JSON.stringify({
    email: options.email,
    password: options.password,
    socket: socketID,
  });
  return (dispatch) => {
    fetch(`${url}/users/sessions/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      body,
    })
      .then(response => response.json())
      .then((responseData) => {
        console.log(responseData)
        if (responseData.email) {
          updateToken(responseData.token);
          dispatch(logInSuccess(responseData));
          AlertIOS.alert('Login Success!');
        } else {
          AlertIOS.alert('Login Failed!', responseData.error);
        }
      }).done();
  };
};
export const logOutSuccess = () => ({
  type: 'LOGOUT',
});

export const logOut = () => (dispatch) => {
  AsyncStorage.removeItem('id_token', (err) => {
    if (err) {
      console.error('error removing session from phone storage ', err);
    }
    dispatch(logOutSuccess());
   });
};

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
    socket.on('updateUser', (data) => {
      console.log('data is ', data);
      if (data.email) {
        dispatch(updateUser({ socket: data.socket }));
        dispatch(logInSuccess(data));
      } else {
        console.log(data);
        dispatch(updateUser(data)); // {socket: ________}
      }
    });
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
        updateToken(responseData.token);
        AlertIOS.alert("Signup Success!");
        dispatch(logInSuccess(responseData));
      } else {
        AlertIOS.alert("Signup Failed!", responseData.error);
      }
    })
    .done();
};

export const getRespondersSucceed = responders => ({
  type: 'UPDATE_RESPONDERS',
  responders,
});

export const getResponders = location => (dispatch) => {
  console.log("In get responders currentLoc is ", location);
  const body = JSON.stringify({
    location,
  });
  fetch(`${url}/users/nearby`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: body,
  })
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(getRespondersSucceed(responseJson));
    })
    .catch(e => console.warn(e));
};
