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

import styles from '../../../styles/styles';
import config from '../../config.js';

import AngelStatusPage from './AngelStatusPage';
import HelpRequest from './HelpRequest';
import HelpRequestAccepted from './HelpRequestAccepted';

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

export default BottomBarAngel;