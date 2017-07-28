'use strict';

import { getHelp, cancelHelp, updateHelp, deleteSession, updateRoute } from '../../../actions/actions'

import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import BottomChat from './BottomChat';
import BottomNav from './BottomNav';

import styles from '../../../styles/styles';

class HelpButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const beacon = {
      socket: this.props.socket,
      location: this.props.location,
      device: this.props.device,
    };

    let helpButton = null;
    if(this.props.isBeacon === false) {
      helpButton = (
        <View>
          <TouchableHighlight
            style={[styles.helpButton]}
            underlayColor='#48BBEC'
            onPress={() => this.props.handleHelpButtonPress(beacon)}>
            <Text style={styles.helpButtonText}>HELP</Text>
          </TouchableHighlight>
        </View>
      )
    } else if(this.props.isBeacon === true && !this.props.missionComplete) {
      helpButton = (
        <View>      
            <TouchableHighlight
              style={styles.cancelButton}
              underlayColor='#b22222'
              onPress={() => this.props.handleCancelButtonPress(beacon)}>
              <Text style={styles.buttonText}>Cancel Help Request</Text>
            </TouchableHighlight>
        </View>
      )
    }

    let helpStatus = null;
    if(this.props.missionComplete && this.props.isBeacon) {
      helpStatus = (
        <View>
          <Text style={styles.prompt}>Your responder marked the mission as COMPLETE, are you good?</Text> 
          <View style={styles.row}>  
          <TouchableHighlight
            style={[styles.goodButton]}
            underlayColor='#48BBEC'
            onPress={() => this.props.handleCancelButtonPress(beacon)}>
            <Text style={styles.helpButtonText}>I'm GOOD</Text>
          </TouchableHighlight>    
          <TouchableHighlight
            style={[styles.helpButton]}
            underlayColor='#48BBEC'
            onPress={() => this.props.handleStillNeedHelp(beacon)}>
            <Text style={styles.helpButtonText}>HELP</Text>
          </TouchableHighlight>     
          </View>
        </View>
      );
    } else if(this.props.isBeacon) {
      if(!this.props.foundResponder) {
        if(this.props.reAssigned) {
          helpStatus = (<Text style={styles.prompt}>Your responder couldn't make it anymore, but we're looking for new help for you, hold tight...</Text>); 
        } else {
          helpStatus = (<Text style={styles.prompt}>We're looking for help for you, hold tight...</Text>); 
        }
      } else if (this.props.foundResponder) {
        helpStatus = (
          <View>
            <Text style={styles.prompt}>Your responder is on his/her way!</Text>
            
            <View style={styles.beaconChatContainer}>
              {this.props.isBeacon &&
                <View style={[styles.container]}>
                  <BottomChat />
                </View>
              }
            </View>
          </View>
        );
      }
    }
    return (
      <View>
        <View>
          {helpButton}
        </View>
        <View>
          {helpStatus}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isBeacon: state.user.isBeacon,
  socket: state.user.socket,
  location: state.user.location,
  foundResponder: state.myResponder.location,
  reAssigned: state.myResponder.reAssigned,
  missionComplete: state.myResponder.missionComplete,
  device: state.user.device,
});

const mapDispatchToProps = dispatch => ({
  handleHelpButtonPress: (beacon) => {
    dispatch(getHelp(beacon));
    dispatch(updateHelp());
  },
  handleCancelButtonPress: (beacon) => {
    dispatch(cancelHelp());
    dispatch(deleteSession(beacon));
    dispatch(updateRoute(null));
  },
  handleStillNeedHelp: (beacon) => {
    dispatch(deleteSession(beacon));
    dispatch(getHelp(beacon));
  },
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(HelpButton);
