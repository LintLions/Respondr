import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { getUserWithTokenAndSocket, getCurrentLocation, getResponders, updateLocation } from '../actions/actions';
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
  }


  componentWillMount() {
    // const locChange = ({ coords }) => {
    //   AsyncStorage.getItem('id_token', (err, value) => {
    //     if (err) {
    //       console.error('error getting session from phone storage ', err);
    //     }
    //     this.props.setLocation([coords.latitude, coords.longitude], value);
    //     this.props.getResponders([coords.latitude, coords.longitude]);
    //   });
    // };
    this.props.getUserWithTokenAndSocket();
    // navigator.geolocation.watchPosition(locChange, error => console.log('error watching position', error), { timeout: 5 * 1000, enableHighAccuracy: true }); 
    // window.setInterval(function() { navigator.geolocation.getCurrentPosition(locChange)}, 5000);
  }

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
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
