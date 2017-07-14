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
      userLocation: '',
      isLoggedIn: false,
      beaconLocation: null,
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
            console.log(this.state.socket);
            console.log(this.state.socket.id);
            if (value !== null) {
              fetch(`${config.url}/users?token=${value}&socket=${this.state.socket.id}`)
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
  componentWillMount() {
    const locChange = ({ coords }) => {
      this.setState({ userLocation: [coords.latitude, coords.longitude] });
    };
    navigator.geolocation.watchPosition(locChange, { timeout: 10 * 1000 });
  }
  componentDidMount() {
    this.state.socket = SocketIOClient(config.url);
    this.state.socket.on('newBeacon', (data) => {
      console.log('hello', data);
      this.setState({ beaconLocation: data });
    });
    this.state.methods.getUserWithToken();
  }
  componentWillUpdate(nextProps, nextState) {
    if (!this.state.isLoggedIn && nextState.isLoggedIn) {
      this.state.socket.emit('updateUser', nextState.user.token);
    }
  }
  render() {
    const props = {
      user: this.state.user,
      userLocation: this.state.userLocation,
      socket: this.state.socket,
      methods: this.state.methods,
      beaconLocation: this.state.beaconLocation,
      isLoggedIn: this.state.isLoggedIn,
    };
    // StackNavigator **only** accepts a screenProps prop so we're passing
    // initialProps through that.
    return <Navigator screenProps={props} />;
  }
}

module.exports = App;
