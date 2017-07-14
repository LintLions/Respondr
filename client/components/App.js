'use strict';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import {StackNavigator, addNavigationHelpers } from 'react-navigation';
import MapPage from './map/MapPage';
import HelpRequest from './map/bottombar/HelpRequest';
import SignUpPage from './signup/signUpPage'
import config from './config.js';

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

export default connect(mapStateToProps)(App)
