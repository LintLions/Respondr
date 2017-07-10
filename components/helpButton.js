'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';

class HelpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <TouchableHighlight 
        style={styles.button}
        underlayColor='#b22222'
        onPress={this.props.getHelp}>
        <Text style={styles.buttonText}>Get Help</Text>
      </TouchableHighlight> 
    )
  }
}

var styles = StyleSheet.create({

  button: {  
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#b22222',
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  } 
}); 

module.exports = HelpButton
