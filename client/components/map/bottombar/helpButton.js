'use strict';

import { getHelp, cancelHelp } from '../../../actions/actions' // JC: do we need this? 

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
    const btnOrModal = this.props.isBeacon === false ?
      (<View style={[styles.helpButtonContainer]}>
          
          <TouchableHighlight
            style={[styles.helpButton]}
            underlayColor='#48BBEC'
            onPress={() => this.props.handleHelpButtonPress()}>
            <Text style={styles.helpButtonText}>HELP</Text>
          </TouchableHighlight>
          
        </View>) :
        (<View>
          <Text style={styles.prompt}>Help is on the way</Text>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#b22222'
            onPress={() => this.props.handleCancelButtonPress()}>
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



const mapStateToProps = (state) => ({
  isBeacon: state.user.isBeacon
})

const mapDispatchToProps = (dispatch) => ({
  handleCancelButtonPress: () => {
    dispatch(cancelHelp());
  },

  handleHelpButtonPress: () => {
    dispatch(getHelp());
  },
});

HelpButton = connect(mapStateToProps, mapDispatchToProps)(HelpButton)

module.exports = HelpButton
