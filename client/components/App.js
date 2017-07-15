import { connect } from 'react-redux';
import React from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import MapPage from './map/MapPage';
import SignUpPage from './signup/signUpPage';
import { getUserWithToken } from '../actions/actions';

export const Navigator = StackNavigator({
  Home: { screen: MapPage },
  Signup: { screen: SignUpPage },
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getUserWithTokenAndSocket();
    // const locChange = ({ coords }) => {
    //   this.setState({ userLocation: [coords.latitude, coords.longitude] });
    // };
    // navigator.geolocation.watchPosition(locChange, { timeout: 10 * 1000 });
  }

  render() {
    const navHelpers = {
      dispatch: this.props.dispatch,
      state: this.props.nav,
    }
    return (
      <Navigator
        navigation={addNavigationHelpers(navHelpers)}
      />
    );
  }

}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

const mapDispatchToProps = (dispatch) => ({
  getUserWithToken: () => {
    dispatch(getUserWithToken());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
