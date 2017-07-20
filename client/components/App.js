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
    const locChange = ({ coords }) => {
      this.props.setLocation([coords.latitude, coords.longitude], this.props.Email);
      this.props.getResponders([coords.latitude, coords.longitude]);
    };
    navigator.geolocation.watchPosition(locChange, { timeout: 10 * 1000 });
    this.props.getUserWithTokenAndSocket();
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
  Email: state.user.email
});

const mapDispatchToProps = dispatch => ({
  getUserWithTokenAndSocket: () => {
    dispatch(getUserWithTokenAndSocket());
  },
  setLocation: (location, Email) => {
    dispatch(updateLocation(location, Email));
  },
  getResponders: (location) => {
    dispatch(getResponders(location));
  },
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
