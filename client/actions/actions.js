import { AlertIOS, AsyncStorage } from 'react-native';
import {
  googleMapsDirectionsApiKey as APIKEY,
  url,
 } from '../components/config';
import { updateToken, socket } from '../components/helpers';
import { store } from '../index';

export const updateBeacon = (options) => ({
  type: 'UPDATE_BEACON',
  ...options,
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

export const getCurrentLocation = (location) => {
  return {
    type: 'GET_CURRENT_LOCATION',
    location,
  };
};


export const cancelHelp = () => {
  return {
    type: 'CANCEL_HELP',
    isBeacon: false,
  };
};

export const logInSuccess = (userData) => {
  console.log('userData ', userData);
  return {
    type: 'LOGIN_SUCCESS',
    userData,
  };
};

export const logIn = (...args) => {
  const socket = store.getState().user.socket;
  return (dispatch) => {
    fetch(`${url}/users/sessions/create`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...args, socket }),
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



export const logOut = () => {
  return {
    type: 'LOGOUT',
  };
};

export const getUserWithTokenAndSocket = () => (dispatch) => {
  AsyncStorage.getItem('id_token', (err, value) => {
    if (err) {
      console.error('error getting session from phone storage ', err);
    }
    console.log('value in getUserWithToken is ', value);
    socket.emit('updateUser', {
      query: {
        token: value,
      },
    });
    socket.on('updateUser', data => dispatch(logInSuccess(data)));
  });
};

// TODO 
// this.drawRoute = (latLong) => { // dest needs to be a string of coordinates (without space)
//       const mode = 'walking'; 
//       const origin = `${this.props.userLocation[0]},${this.props.userLocation[1]}`;
//       const dest = `${latLong[0]},${latLong[1]}`;
//       const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${APIKEY}&mode=${mode}`;
//       console.log(url);
//       fetch(url)
//         .then(response => response.json())
//         .then(responseJson => {
//           if(responseJson.routes.length) {
//             console.log(`setting coords state`);
//             // action
//             this.setState({
//               coords: helpers.decode(responseJson.routes[0].overview_polyline.points),
//             });
//           }
//         }).catch(e => {console.warn(e)});
      
//       console.log('url: ', url)
//     }


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
  