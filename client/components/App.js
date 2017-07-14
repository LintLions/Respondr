import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
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
        updateState: newState => this.setState(newState),
        getToken: async () => AsyncStorage.getItem('id_token'),
        getUserWithToken: async () => {
          try {
            const value = await AsyncStorage.getItem('id_token');
            console.log('value is ', value);
            if (value !== null) {
              fetch(`${config.url}/users?token=${value}`)
                .then(response => response.json())
                .then((responseJson) => {
                  console.log('response from getUserWithToken ', responseJson);
                  this.setState({
                    user: responseJson,
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
  componentDidMount() {
    this.state.methods.getUserWithToken();
    this.socket = SocketIOClient(config.url);
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
