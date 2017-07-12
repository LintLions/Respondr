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

class HelpButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    const btnOrModal = this.props.helpButtonVisible ?
      (<View>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#48BBEC'
            onPress={this.props.getHelp}>
            <Text style={styles.buttonText}>Get Help</Text>
          </TouchableHighlight>
        </View>) :
        (<View>
          <Text style={styles.prompt}>Help is on the way</Text>
          <TouchableHighlight 
            style={styles.button}
            underlayColor='#b22222'
            onPress={this.props.cancelHelp}>
            <Text style={styles.buttonText}>Cancel Help Request</Text>
          </TouchableHighlight>
        </View>);
    return (
      <View style={styles.container}>
        {btnOrModal}
      </View>
    )    
  }    
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    flex: 1,
    height: 222,
    padding: 15,
    margin: 25,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
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
    margin: 25
  },
  buttonDirection: {
    flexDirection: 'row',
  },
  button: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 36,
    margin: 10,

    backgroundColor: '#b22222',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  }
});

module.exports = HelpButton
