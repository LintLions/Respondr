'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  SegmentedControlIOS,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';
import styles from './topbar/styles'

class HelpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    const btnOrModal = this.props.helpButtonVisible ?
      (<TouchableHighlight 
          style={Styles.button}
          underlayColor='#b22222'
          onPress={this.props.getHelp}>
          <Text style={styles.buttonText}>Get Help</Text>
        </TouchableHighlight>) :
        (<View style={Styles.button}>
          <Text>Help is on the way</Text>
          <TouchableHighlight 
            style={Styles.button}
            underlayColor='#b22222'
            onPress={this.props.cancelHelp}>
            <Text style={styles.buttonText}>Cancel Help Request</Text>
          </TouchableHighlight>
        </View>);
    return (
      <View >
        {btnOrModal}
      </View>
    )    
  }    
}

var Styles = StyleSheet.create({

  button: {  
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: '#b22222',
    borderColor: '#b22222',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },  
}); 

module.exports = HelpButton
