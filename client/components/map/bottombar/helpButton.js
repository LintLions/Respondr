'use strict';

import { getHelp, cancelHelp } from '../../../actions/actions'

import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

import styles from '../../../styles/styles';

class HelpButton extends Component {
  constructor(props) {
    super(props);
  
  }
  render() {
    let beacon = {
      socket: this.props.socket,
      location: this.props.location,
    }

    const btnOrModal = this.props.isBeacon === false ?
      (<View style={[styles.helpButtonContainer]}>
          <TouchableHighlight
            style={[styles.helpButton]}
            underlayColor='#48BBEC'
            onPress={() => this.props.handleHelpButtonPress(beacon)}>
            <Text style={styles.helpButtonText}>HELP</Text>
          </TouchableHighlight>
        </View>) :
        (<View>          
          <TouchableHighlight
            style={styles.button}
            underlayColor='#b22222'
            onPress={() => this.props.handleCancelButtonPress()}>
            <Text style={styles.buttonText}>Cancel Help Request</Text>
          </TouchableHighlight>
          {(!this.props.myResponder) ? 
            (<Text style={styles.prompt}>We're looking for help for you, hold tight...</Text>):
            (<Text style={styles.prompt}>Your responder is on his/her way!</Text>)
          }
        </View>);
    
    return (
      <View style={styles.container}>
        {btnOrModal}
      </View>
    )    
  }    
}

const mapStateToProps = (state) => ({
  isBeacon: state.user.isBeacon,
  socket: state.user.socket,
  location: state.user.location,
  myResponder: state.myResponder.location,
})

const mapDispatchToProps = (dispatch) => ({
  handleHelpButtonPress: (beacon) => {
    dispatch(getHelp(beacon));
  },
  handleCancelButtonPress: () => {
    dispatch(cancelHelp());
  },
});

HelpButton = connect(mapStateToProps, mapDispatchToProps)(HelpButton)

module.exports = HelpButton
