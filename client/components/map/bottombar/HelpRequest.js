'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';

import HelpRequestAccepted from './HelpRequestAccepted';
import AngelStatusPage from './AngelStatusPage';

import styles from '../../../styles/styles';

class HelpRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    console.log('+++HelpRequest.js');
    
    return (
      <View style={[styles.container]}>
        
        <View style={[styles.container, styles.box1]}>
          <Text style={styles.prompt}>
            Hi {this.props.username}, there's a beacon at {this.props.beaconLocation}, would you be able to assist?
          </Text>
          <View style={styles.row}>
            <TouchableHighlight 
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestYes}
              >
              <Text style={styles.missionButtonText}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestNo}
              >
              <Text style={styles.missionButtonText}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

var styleSheet = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: '#999999',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  box2: {
    flex: 2
  },
  bottomBox: {
    position: 'absolute'
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
  buttonDirection: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
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
  }
});

module.exports = HelpRequest;