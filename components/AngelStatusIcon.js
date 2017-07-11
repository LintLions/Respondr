'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Switch
} from 'react-native';

class AngelStatusIcon extends React.Component {
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
      <View style={styles.toggleIcon}>
        <Text>Your Angel Status</Text>
        <Switch
          onValueChange={(e) => this.props.handleSwitchIsOn(e)}
          value={this.props.switchIsOn} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  toggleIcon: {
    padding: 20
  }
})

module.exports = AngelStatusIcon;