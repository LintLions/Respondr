'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapPage from './MapPage';
import SignUpPage from './signup/signUpPage'

const App = StackNavigator({
  Home: { screen: MapPage},
  Signup: {screen: SignUpPage }
});

module.exports = App;
