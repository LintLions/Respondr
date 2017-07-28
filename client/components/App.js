import { connect } from 'react-redux';
import React from 'react';
import { PushNotificationIOS, AppState } from 'react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { startLocationUpdate } from './helpers';
import { getUserWithTokenAndSocket, getResponders, updateLocation, updateIntervalID } from '../actions/actions';
import MapPage from './map/MapPage';
import SignUpPage from './signup/signUpPage';
import MyProfile from './map/bottombar/MyProfile';
import MyProfileEdit from './map/bottombar/MyProfileEdit';
import PushNotification from './Push';

import BackgroundGeolocation from 'react-native-background-geolocation';

export const Navigator = StackNavigator({
  Home: {
    screen: MapPage,
    navigationOptions: {
      header: null,
    },
  },
  Signup: { screen: SignUpPage },
  Profile: { screen: MyProfile},
  ProfileEdit: { screen: MyProfileEdit},
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      appState: AppState.currentState
    };
    // this.backgroundLocation = (nextAppState) => {
    //   if (nextAppState === 'background') {
    //     console.log('App has gone to the background!')
    //     navigator.geolocation.watchPosition((position) => this.props.setLocation([position.coords.latitude, position.coords.longitude], this.props.token), (error) => console.log(error), { enableHighAccuracy: true, timeout: 3000, maximumAge: 1000, distanceFilter: 10 })
    //   }
    // }
  }

  componentDidMount() {
    PushNotificationIOS.requestPermissions();
    setInterval(() => {}, 1000);
    this.props.getUserWithTokenAndSocket();
    if (AppState.currentState ==='background') {
      BackgroundGeolocation.on('location', this.props.setLocation(location, this.props.token));
    }
    // AppState.addEventListener('change', this.backgroundLocation)
    
    
    // AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUpdate(nextProps, nextState) {
    // update userLoaction on redux Store
    // get nearbyResponders
    // if (nextProps.token)
      // then update responder info in DB
    if (nextProps.token !== this.props.token) {
      if (this.props.intervalID && !nextProps.token) {
        clearInterval(this.props.intervalID);
      }
      if (nextProps.token) {
        this.state.interval = setInterval(startLocationUpdate(nextProps.token), 5000);
        clearInterval(this.props.intervalID);
        this.props.updateIntervalID(this.state.interval);
      } else {
        this.state.interval = setInterval(startLocationUpdate(), 5000);
        clearInterval(this.props.intervalID);
        this.props.updateIntervalID(this.state.interval);
      }
    } else if (nextProps.socket !== this.props.socket) {
      this.state.interval = setInterval(startLocationUpdate(), 5000);
      clearInterval(this.props.intervalID);
      this.props.updateIntervalID(this.state.interval);
    }
  }
// App mounts
// Getuserwithtokenandsocket dispatches,

// that dispatches updateLocation(location, token) with setInterval
// UpdateLocation dispatches getResponders.
  componentWillUnmount() {
    BackgroundGeolocation.un('location', this.onLocation);
  }

  render() {
    const navHelpers = {
      dispatch: this.props.dispatch,
      state: this.props.nav,
    };
    return (
      <Navigator
        navigation={addNavigationHelpers(navHelpers)}
      />
    );
  }

}

const mapStateToProps = state => ({
  nav: state.nav,
  isLoggedIn: state.responder.isLoggedIn,
  token: state.responder.token,
  intervalID: state.responder.intervalID,
  socket: state.user.socket,
  beaconLocation: state.myBeacon.location,
});

const mapDispatchToProps = dispatch => ({
  getUserWithTokenAndSocket: () => {
    dispatch(getUserWithTokenAndSocket());
  },
  setLocation: (location, token) => {
    console.log('setting-location')
    dispatch(updateLocation(location, token));
  },
  getResponders: (location) => {
    dispatch(getResponders(location));
  },
  updateIntervalID: (intervalID) => {
    dispatch(updateIntervalID(intervalID));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
