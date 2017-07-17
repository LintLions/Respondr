'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import styles from '../../../styles/styles';

class HelpRequestAccepted extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    console.log('+++HelpRequestAccepted.js');
    
    return (
      <View style={styles.container}>
      
        <View style={[styles.container, styles.box1]}>
          <Text style={styles.prompt}>
            You're an angel {this.props.username}!
          </Text>
          <View style={styles.row}>
            <TouchableHighlight
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestCancel}
            >
              <Text style={styles.missionButtonText}>I can't make it anymore</Text>
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
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
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
  },
  stretch: {
    alignItems: 'stretch'
  }
});

module.exports = HelpRequestAccepted;

