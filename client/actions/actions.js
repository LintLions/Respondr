import config from '../components/config.js';
import {AlertIOS, AsyncStorage} from 'react-native';
import {updateToken} from '../components/helpers.js';

export const getCurrentLocation = (userData) => {
  return {
    type: 'GET_CURRENT_LOCATION',
    userData
  };
};

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

export const getUserWithToken =  async () => {
  try {
    const value = await AsyncStorage.getItem('id_token');
    console.log('value in getUserWithToken is ', value);
    if (value !== null) {
      fetch(`${config.url}/users?token=${value}`)
        .then(response => response.json())
        .then((responseJson) => {
          console.log('response from getUserWithToken ', responseJson);
          dispatch(logInSuccess(responseJson))
        });
    }
    return value;
  } catch (error) {
    console.error(`error getting user with id_token ${error}`);
    return error;
  }
}


// this.login = () => {
//       fetch(`${config.url}/users/sessions/create`, {
//         method: "POST",
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: this.state.email,
//           password: this.state.password,
//         })
//       })
//         .then((response) => response.json())
//         .then((responseData) => {
//           this.props.screenProps.methods.updateToken(responseData.id_token);
//           AlertIOS.alert("Login Success!")
          
//           // store.user.email = response.email
//         })
//         .done();
//     }


  // methods: {
  //       updateToken: async (value) => {
  //         try {
  //           await AsyncStorage.setItem('id_token', value);
  //         } catch (error) {
  //           console.log('AsyncStorage error: ' + error.message);
  //         }
  //       },
  //       getUserWithToken: async () => {
  //         try {
  //           const value = await AsyncStorage.getItem('id_token');
  //           console.log('value is ', value)
  //           if (value !== null){
  //             return fetch(`${config.url}/users/getUser/`)
  //               .then((response) => response.json())
  //               .then((responseJson) => {
  //               console.log('response from getUserWithToken ', responseJson);
  //               this.setState({
  //                 user:{
  //                   fullName: responseJson.fullName,
  //                   email: responseJson.email
  //                  }, 
  //                 isLoggedIn: true
  //               })
                
  //             })
  //           }      
  //         } catch (error) {
  //           console.error("error getting user with id_token", error);
  //         }
  //       },
  //       updateDevice: async (value) => {
  //         try {
  //           await AsyncStorage.setItem('device', value);
  //         } catch (error) {
  //           console.log('AsyncStorage error: ' + error.message);
  //         }
  //       },
  //       getAsyncData: async (string) => {
  //         try {
  //           await AsyncStorage.getItem(string)
  //         } catch (error) {
  //           console.log('AsyncStorage error: ' + error.message);
  //         }
  //       },
  //       updatePushData: (data) => {
  //         this.setState({pushData: data});
  //       },
  //       handleIsLoggedIn: () => {
  //         this.setState({
  //           isLoggedIn: !(this.state.isLoggedIn)
  //         })
  //       }
  //     }
    // }
  