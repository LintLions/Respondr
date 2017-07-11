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
import config from './config.js';

const Navigator = StackNavigator({
  Home: { screen: MapPage}, // MapPage
  Signup: {screen: SignUpPage }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false,
      beaconExists: false,
      methods: {
        updateToken: async (value) => {
          try {
            await AsyncStorage.setItem('id_token', value);
          } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
          }
        },
        getUserWithToken: async() => {
          try {
            const value = await AsyncStorage.getItem('id_token');
            if (value !== null){
              fetch(`${config.url}/users/getUser/${value}`, {
                method: "GET"
              })
              .then((response) => {
                this.setState({
                  user:{
                    fullName: response.fullName,
                    email: response.email,
                    phone: response.phone,
                    organization: response.organization,
                    status: response.status,
                    public: response.public
                   }, 
                  isLoggedIn: true
                })
              })
            }      
          } catch (error) {
            console.error("error getting user with id_token", error);
          }
        }
      }
    }
  }   
  render() {
    const props = {user: this.state.user, methods: this.state.methods, beaconExists: this.state.beaconExists, isLoggedIn:this.state.isLoggedIn};
    // StackNavigator **only** accepts a screenProps prop so we're passing
    // initialProps through that.
    return <Navigator screenProps={props} />; 
  }
}

module.exports = App;
