'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';

// props received: userName, beaconLocation
// props to pass down: yes/no to help request 

class HelpRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: ''
    };
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress = (e) => {
    this.setState ({
      loginStatus: {e}
    })
    console.log('+++e from handlPress:', e);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.box2}
          showsUserLocation={true}
          followsUserLocation={true}
        />
        <View style={styles.box1}>
          <Text style={styles.prompt}>
            Hi {this.props.userName}, there's a beacon at {this.props.beaconLocation}, would you be able to assist?
          </Text>
          <View style={styles.flowRight}>
            <TouchableHighlight 
              style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.handlePress}
              >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.handlePress}
              >
              <Text style={styles.buttonText}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  box2: {
    flex: 2
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  prompt: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    color: '#656565',
    marginBottom: 20
  },
  button: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 36,
    margin: 10,

    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  flowRight: {
    flexDirection: 'row',
    // alignItems: 'center',
  }
});

module.exports = HelpRequest;