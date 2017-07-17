'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  AsyncStorage,
  AlertIOS,
  Switch
} from 'react-native';
import MapView from 'react-native-maps';
import AngelStatusPage from './AngelStatusPage';
import HelpRequest from './HelpRequest';
import HelpRequestAccepted from './HelpRequestAccepted';
import config from '../../config.js';

class BottomBarAngel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpRequestStatus: 'default',
      helpRequestCancel: false
    };
  }

  render() {
    let Page = null;
    if (!this.props.isAssigned) {
      Page = <HelpRequest />
    } else if (this.props.isAssigned) {
      if (this.props.isAssigned) {
        Page = <HelpRequestAccepted  />
      }
    }
    return (
      <View style={styles.container}>
        {Page}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    flex: 1,
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
  }
});

const mapStateToProps = (state) => ({
  beaconLocation: state.myBeacon.location,
  isAssigned: state.myBeacon.isAssigned,
});

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestYes: () => {
    dispatch(drawRoute(this.props.beaconLocation));
    dispatch(updateBeacon({ isAssigned: true }));
  },
});

module.exports = BottomBarAngel;