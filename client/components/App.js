import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { startLocationUpdate } from './helpers';
import { getUserWithTokenAndSocket, getCurrentLocation, getResponders, updateLocation, updateIntervalID } from '../actions/actions';
import MapPage from './map/MapPage';
import SignUpPage from './signup/signUpPage';

export const Navigator = StackNavigator({
  Home: { screen: MapPage, navigationOptions: {
    header: null },
  },
  Signup: { screen: SignUpPage },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
    }
  }


  componentDidMount() {
    // const locChange = ({ coords }) => {
    //   AsyncStorage.getItem('id_token', (err, value) => {
    //     if (err) {
    //       console.error('error getting session from phone storage ', err);
    //     }
    //     this.props.setLocation([coords.latitude, coords.longitude], value);
    //     this.props.getResponders([coords.latitude, coords.longitude]);
    //   });
    // };
    setInterval(() => {} , 1000)
    this.props.getUserWithTokenAndSocket();
    // navigator.geolocation.watchPosition(locChange, error => console.log('error watching position', error), { timeout: 5 * 1000, enableHighAccuracy: true });
    // window.setInterval(function() { navigator.geolocation.getCurrentPosition(locChange)}, 5000);
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
  // componentWillUnmount() {
  //   clearInterval(this.props.intervalID);
  //   clearInterval(this.state.interval);
  // }
// App mounts
// Getuserwithtokenandsocket dispatches,

// that dispatches updateLocation(location, token) with setInterval
// UpdateLocation dispatches getResponders.

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
});

const mapDispatchToProps = dispatch => ({
  getUserWithTokenAndSocket: () => {
    dispatch(getUserWithTokenAndSocket());
  },
  setLocation: (location, token) => {
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
