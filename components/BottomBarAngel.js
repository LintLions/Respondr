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
import config from './config.js';

class BottomBarAngel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpRequestStatus: 'default',
      helpRequestCancel: false
    };
    this.handleHelpRequestYes = this.handleHelpRequestYes.bind(this);
    this.handleHelpRequestNo = this.handleHelpRequestNo.bind(this);
    this.handleHelpRequestCancel = this.handleHelpRequestCancel.bind(this);
  }

  handleHelpRequestYes = (e) => {
    e.preventDefault;
    this.setState ({
      helpRequestStatus: 'yes'
    })
  }

  handleHelpRequestNo = async (e) => {
    e.preventDefault;
    this.setState ({
      helpRequestStatus: 'no'
    });
  }

  handleHelpRequestCancel = (e) => {
    e.preventDefault;
    this.setState ({
      helpRequestCancel: true
    })
  }
  render() {
    let Page = null;
    if(this.props.switchIsOn === false || this.props.beaconExists === false ) {
      Page = <AngelStatusPage switchIsOn={this.props.switchIsOn} handleSwitchIsOn={this.props.handleSwitchIsOn} username={this.props.username} />
    } else {
      if(this.state.helpRequestStatus === 'default') {
        Page = <HelpRequest switchIsOn={this.props.switchIsOn} handleSwitchIsOn={this.props.handleSwitchIsOn} username={this.props.username} beaconLocation={this.props.beaconLocation} handleHelpRequestYes={this.handleHelpRequestYes} handleHelpRequestNo={this.handleHelpRequestNo}/>
      } else if(this.state.helpRequestStatus === 'yes') {
        if(this.state.helpRequestCancel === false) {
          Page = <HelpRequestAccepted switchIsOn={this.props.switchIsOn} handleSwitchIsOn={this.props.handleSwitchIsOn} username={this.props.username} handleHelpRequestCancel={this.handleHelpRequestCancel} />
        } else {
          Page = <AngelStatusPage switchIsOn={this.props.switchIsOn} handleSwitchIsOn={this.props.handleSwitchIsOn} username={this.props.username} />
          // should be notified whne the next beacon shows up still 
        }
      } else if (this.state.helpRequestStatus === 'no') {
        Page = <AngelStatusPage switchIsOn={this.props.switchIsOn} handleSwitchIsOn={this.props.handleSwitchIsOn} username={this.props.username} />
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

module.exports = BottomBarAngel;