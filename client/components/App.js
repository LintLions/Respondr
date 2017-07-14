import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MapPage from './map/MapPage';
import SignUpPage from './signup/signUpPage';
import config from './config';

const Navigator = StackNavigator({
  Home: { screen: MapPage },
  Signup: { screen: SignUpPage },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false,
      beaconExists: false,
      methods: {
        updateToken: async (value) => {
          try {
            await AsyncStorage.setItem('id_token', value);
          } catch (error) {
            console.log(`AsyncStorage error: ${error.message}`);
          }
        },
        getUserWithToken: async () => {
          try {
            const value = await AsyncStorage.getItem('id_token');
            console.log('value is ', value);
            if (value !== null) {
              return fetch(`${config.url}/users/getUser/`)
                .then(response => response.json())
                .then((responseJson) => {
                  console.log('response from getUserWithToken ', responseJson);
                  this.setState({
                    user: {
                      fullName: responseJson.fullName,
                      email: responseJson.email,
                    },
                    isLoggedIn: true,
                  });
                });
            }
            return value;
          } catch (error) {
            console.error(`error getting user with id_token ${error}`);
            return error;
          }
        },
        handleIsLoggedIn: () => {
          this.setState({
            isLoggedIn: !(this.state.isLoggedIn),
          });
        },
      },
    };
  }
  render() {
    const props = {
      user: this.state.user,
      methods: this.state.methods,
      beaconExists: this.state.beaconExists,
      isLoggedIn: this.state.isLoggedIn,
    };
    // StackNavigator **only** accepts a screenProps prop so we're passing
    // initialProps through that.
    return <Navigator screenProps={props} />;
  }
}

module.exports = App;
