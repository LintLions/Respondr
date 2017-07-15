'use strict';

import { getHelp, cancelHelp } from '../../../actions/actions' // JC: do we need this? 

import { connect } from 'react-redux';
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
  
  }
  render() {
    const btnOrModal = this.props.isBeacon === false ?
      (<View>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#48BBEC'
            onPress={this.props.handleHelpButtonPress}>
            <Text style={styles.buttonText}>Get Help</Text>
          </TouchableHighlight>
        </View>) :
        (<View>
          <Text style={styles.prompt}>Help is on the way</Text>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#b22222'
            onPress={this.props.handleCancelButtonPress}>
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

const mapStateToProps = (state) => ({
  isBeacon: state.user.isBeacon
})

const mapDispatchToProps = (dispatch) => ({
  handleCancelButtonPress: () => {
    dispatch(cancelHelp());
  },

  handleHelpButtonPress: () => {
    dispatch(getHelp());
  }
})

HelpButton = connect(mapStateToProps, mapDispatchToProps)(HelpButton)

module.exports = HelpButton
