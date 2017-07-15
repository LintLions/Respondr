'use strict';
import { connect } from 'react-redux';
import React from 'react';
import {
  AsyncStorage,
} from 'react-native';
import {StackNavigator, addNavigationHelpers } from 'react-navigation';
import MapPage from './map/MapPage';
import SignUpPage from './signup/signUpPage';
import config from './config';
import { getUserWithToken } from '../actions/actions.js';

export const Navigator = StackNavigator({
  Home: { screen: MapPage},
  Signup: {screen: SignUpPage }
});

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getUserWithToken()
    navigator.geolocation.getCurrentPosition( //this will need to be refactored into redux updating the userReducer (not the current userReducer, the new one Jenny is writing)
      (position) => {
    console.log(position)
   })
  }

  render() {
    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
        }
        )}
      /> 
    )
  }

}

const mapStateToProps = (state) => ({
  nav: state.nav,
})

const mapDispatchToProps = (dispatch) => ({
  getUserWithToken: () => {
    dispatch(getUserWithToken());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
