import { AlertIOS, AsyncStorage } from 'react-native';
import {
  googleMapsDirectionsApiKey as APIKEY,
  googleMapsGeoCodingApiKey as GEOAPIKEY,
  url,
 } from '../components/config';
import { updateToken, socket, decode, startLocationUpdate } from '../components/helpers';
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
  type: 'UPDATE_MY_BEACON',
  options,
});

export const updateMyResponder = options => ({
  type: 'UPDATE_MY_RESPONDER',
  options,
})

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

export const getHelp = (beacon) => (dispatch) => {
  console.log('+++actions.js - getHelp - beacon: ', beacon);

  socket.emit('getHelp', beacon);
};

export const getHelpAgain = (responder) => (dispatch) => {
  console.log('+++actions.js - getHelp - responder: ', responder);

  socket.emit('getHelp', responder);
  
  dispatch(updateBeacon({
    UID: null,
    location: null,
    isAssigned: false,
    isCompleted: false, 
    chatRoom: null,
    chatMessages: [],
    region: null,
  }))
}

export const acceptBeacon = (responder) => (dispatch) => { //  (dispatch) =>
  console.log('+++in actions.js - acceptBeacon - responder: ', responder);

  socket.emit('acceptBeacon', responder); 
}

export const getCurrentLocation = location => ({
  type: 'GET_CURRENT_LOCATION',
  location,
});

// Action for updating Userlocation in DB. Will get called on 
// App will mount and dispatches the getCurrentLocation action that updates userlocation in the redux store
export const updateLocation = (location, token) => (dispatch) => {
  if (token) {
    console.log('location in updateLocation is: ', location)
    const body = JSON.stringify({
      location,
      token,
    });
    fetch(`${url}/users/location`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
      },
      body,
    });
  }
  dispatch(getCurrentLocation(location));
  dispatch(getResponders(location));
  const beaconLocation = store.getState().myBeacon.location;
  const beaconisAssigned = store.getState().myBeacon.isAssigned
  const responderLocation = store.getState().myResponder.location
  if ((beaconLocation && beaconisAssigned) || responderLocation) {
    dispatch(drawRoute());
  }
}
export const cancelHelp = () => ({
  type: 'CANCEL_HELP',
  isBeacon: false,
});

export const deleteSession = (beacon) => (dispatch) => {
  console.log('+++in actions.js - deleteSession - beacon: ', beacon);
  
  dispatch(updateMyResponder({
    name: null,
    location: null,
    chatRoom: null,
    chatMessages: [],
    reAssigned: false,
    missionComplete: false,
  }))
  
  socket.emit('deleteSession', beacon);
}

export const logInSuccess = (userData) => {
  console.log('userData in logInSuccess: ', userData);
  return {
    type: 'LOGIN_SUCCESS',
    userData,
  };
};

export const logIn = (options) => {
  const user = store.getState().user;
  const body = JSON.stringify({
    email: options.email,
    password: options.password,
    socket: user.socket,
    device: user.device,
    OS: user.OS,
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

export const updateIntervalID = intervalID => ({
  type: 'UPDATE_INTERVALID',
  intervalID
})

// App mounts
// Getuserwithtokenandsocket dispatches,

// that dispatches updateLocation(location, token) with setInterval
// UpdateLocation dispatches getResponders.

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
    : store.getState().myBeacon.location ? store.getState().myBeacon.location.join(',')
    : store.getState().myResponder.location.join(',');
  const googleUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${APIKEY}&mode=${mode}`;
  console.log('+++actions.js - drawRoute - googleUrl: ', googleUrl)
  fetch(googleUrl)
    .then(response => response.json())
    .then((responseJson) => {
      console.log('+++actions.js - drawRoute - responseJson: ', responseJson)
      if (responseJson.routes.length) {
        dispatch(updateRoute(decode(responseJson.routes[0].overview_polyline.points)));
      }
    }).catch(e => console.warn(e));
};

export const signUp = userData => (dispatch) => {
  console.log("userData in signUp: ", userData);

  const signUpPost = (userData) => {
    var userData = JSON.stringify(userData);
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
  }  
    
  if (userData.mobility === 0) {
    const re = / /g
    const address = userData.address.replace(re, '+');
    const city = userData.city.replace(re, '+');
    const state = userData.state.replace(re, '+');
    const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${GEOAPIKEY}`;
    console.log('googleUrl is ', googleUrl);
    fetch(googleUrl)
    .then(results => results.json())
    .then((location) => {
      console.log('signup location is ', location.results[0].geometry.location);
      userData.location = [location.results[0].geometry.location.lat, location.results[0].geometry.location.lng],
      userData.geometry = {
        type:'Point',
        coordinates:[location.results[0].geometry.location.lat, location.results[0].geometry.location.lng],
      };
      signUpPost(userData);
    });

  } else {
    signUpPost(userData);
  }
};

export const getRespondersSucceed = responders => ({
  type: 'UPDATE_RESPONDERS',
  responders,
});

export const getResponders = location => (dispatch) => {
  // console.log("In get responders currentLoc is ", location);
  const body = JSON.stringify({
    location,
  });
  fetch(`${url}/users/nearby`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(getRespondersSucceed(responseJson));
    })
    .catch(e => console.warn(e));
};

export const missionComplete = (responder) => (dispatch) => {
  console.log('+++in actions.js - missionComplete')

  dispatch(updateBeacon({ 
    UID: null, 
    location: null,
    isAssigned: false,
    isCompleted: false,
    chatRoom: null,
    chatMessages: [], // individual msgs live on component's lcoal state 
    region: null,
  }));
  
  socket.emit('missionComplete', responder);

}

export const changeAvailability = available => ({
  type: 'CHANGE_AVAILABILITY',
  available,
});

export const switchAvailability = (availability, id) => (dispatch) => {
  console.log("availability is ", availability);

  fetch(`${url}/users/online`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([availability, id]),
  })
  .then(() => {
    dispatch(changeAvailability(availability));
  })
  .catch(e => console.warn("error updating availabity ", e));
};

export const editProfile = (userData) => (dispatch) => {
  console.log('+++actions.js - editProfile - userData: ', userData);

  socket.emit('editProfile', userData);

  let updatedStates = {};
  for (var key in userData) {
    if(userData[key] !== '' && key !== 'socket') {
      updatedStates[key] = userData[key];
    }
  }

  dispatch(updateResponder(updatedStates));
}

export const updateResponder = options => ({
  type: 'UPDATE_RESPONDER',
  options,
});