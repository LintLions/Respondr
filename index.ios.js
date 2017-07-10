/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
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

const iosBeacon = StackNavigator({
  Home: { screen: MapPage},
  Signup: {screen: SignUpPage }
});

AppRegistry.registerComponent('iosBeacon', () => iosBeacon);
