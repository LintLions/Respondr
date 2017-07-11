'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapPage from './MapPage';
import SignUpPage from './signup/signUpPage'

const Navigator = StackNavigator({
  Home: { screen: MapPage}, // MapPage
  Signup: {screen: SignUpPage }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {username: 'Benji'},
      beaconExists: false,
      methods: {
        changeName: () => this.setState(prev => {user: {userName:'Bilbo'}}),
        updateToken: async (value) => {
          try {
            await AsyncStorage.setItem('id_token', value);
          } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
          }
        }
      },
    }
  } 
  render() {
    const props = {user: this.state.user, beaconExists: this.state.beaconExists, methods: this.state.methods};
    // StackNavigator **only** accepts a screenProps prop so we're passing
    // initialProps through that.
    return <Navigator screenProps={props} />; 
  }
}

module.exports = App;
