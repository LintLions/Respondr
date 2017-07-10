'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import MapPage from './MapPage';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      initialPosition: '',
    };
    this.onUsernameChange = (event)  => {
      this.setState({ username: event.nativeEvent.text });
    };
    this.onPasswordChange = (event)  => {
      this.setState({ password: event.nativeEvent.text });
    };
    this.onLoginPressed = () => {
      // LOGIN FETCH - on resp set isLoading: false
      this.setState({isLoading: true});
      this.props.navigator.push({
        title: 'Map',
        component: MapPage,
        passProps: {
          username: this.state.username,
          location: this.state.initialPosition
        }
      });
    };
    this.getLocation = () => {
      console.log('location');
      navigator.geolocation.getCurrentPosition(
         (position) => {
            let {latitude, longitude} = position.coords;
            console.log('success', position);
            this.setState({initialPosition: `lat: ${latitude}, long: ${longitude}`});
         },
         (error) => alert(error.message),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }
  }
  render() {
    var spinner = this.state.isLoading
      ? (<ActivityIndicator size='large'/> )
      : (<View/>);
    var location = this.state.initialPosition !== ''
      ? (<Text style={styles.description}>{this.state.initialPosition}</Text>)
      : (<View/>);
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.username}
            onChange={this.onUsernameChange}
            placeholder='username'/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            secureTextEntry={true} 
            value={this.state.password}
            onChange={this.onPasswordChange}
            placeholder='password'/>
          <TouchableHighlight 
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onLoginPressed}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight 
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.getLocation}>
            <Text style={styles.buttonText}>Location</Text>
          </TouchableHighlight>
        </View>
        {location}
        {spinner}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

module.exports = LoginPage;
