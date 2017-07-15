import config from '../components/config.js';
import {AlertIOS, AsyncStorage} from 'react-native';
import {updateToken} from '../components/helpers.js';

export const goBack = () => {
  return {
    type: 'BACK',
  }
}
export const goHome = () => {
  console.log("going Home");
  return {
    type: 'HOME'
  }
}
export const getHelp = () => {
  return {
    type: 'GET_HELP',
    isBeacon: true,
  };
};

export const cancelHelp = () => {
  return {
    type: 'CANCEL_HELP',
    isBeacon: false,
  };
};

export const logIn = (email, password) => {
  return dispatch => {
   fetch(`${config.url}/users/sessions/create`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          console.log('responseData.user in LoginAction', responseData.user)
          updateToken(responseData.user.token);
          dispatch(logInSuccess(responseData.user));
          AlertIOS.alert('Login Success!');
        } else {
           AlertIOS.alert('Login Failed!', responseData.error);
          }
      }).done();        
  }
}  

export const logInSuccess = (userData) => {
  console.log('userData ', userData);
  return {
  type: "LOGIN_SUCCESS",
  userData
}
}


export const logOut = () => {
  return {
    type: 'LOGOUT',
  }
}

export const getUserWithToken =  () => {
  return dispatch => {
    console.log("I'm in getUserWithToken");
    AsyncStorage.getItem('id_token', (err, value) => {
      if (err) {console.error("error getting session from phone storage ", err)}
      console.log('value in getUserWithToken is ', value);
      if (value !== null) {
        fetch(`${config.url}/users?token=${value}`)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('response from getUserWithToken ', responseJson);
            dispatch(logInSuccess(responseJson))
          });
      }
    })
  }
}

export const signUp = (userData) => {
  return dispatch => {
    console.log("userData is ", userData);
      fetch(`${config.url}/users`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: userData
      })
        .then((response) => response.json())
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
    
  }
}