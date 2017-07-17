'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Switch
} from 'react-native';

import styles from '../../../styles/styles';

class AngelStatusPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    // let switchComponentStyle;
    // if(this.props.switchIsOn === true) {
    //   switchComponentStyle = styles.containerInner
    // } else {
    //   switchComponentStyle = styles.container
    // }
    return(
      <View style={styles.container}>
        <Text>
          Hi {this.props.username}! Set your oncall status:
        </Text>
        <Switch
          // style={styles.switchButton}
          onValueChange={(e) => this.props.handleSwitchIsOn(e)}
          value={this.props.switchIsOn} />
      </View>
    )
  }
}

var styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  containerInner: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#999999',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  switchButton: {
    
  }
})

module.exports = AngelStatusPage;