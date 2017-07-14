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

export const Navigator = StackNavigator({
  Home: { screen: MapPage},
  Signup: {screen: SignUpPage }
});

const App = ({ dispatch, nav}) => (
  <Navigator navigation={addNavigationHelpers({
      dispatch,
      state: nav
      }
    )}
  /> 
);

const mapStateToProps = (state) => ({
  nav: state.nav,
})
  // componentDidMount() {
  //   this.state.methods.getUserWithToken();
  // }

export default connect(mapStateToProps)(App)
