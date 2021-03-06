import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList
} from 'react-native';
import { drawRoute, updateBeacon, acceptBeacon, updateUser } from '../../../actions/actions';

import styles from '../../../styles/styles';

class HelpRequest extends Component {
  constructor(props) {
    super(props);
  };


  render() {
    console.log('+++in HelpRequest.js');
    let responder = {
      UID: this.props.UID,
      responderId: this.props.responderId,
      responderLocation: this.props.responderLocation,
    }
    console.log('+++in HelpRequest.js - responder: ', responder)
    
    return (
      <View style={[styles.container]}>
        <View style={[styles.container, styles.box1]}>
          <Text style={styles.prompt}>
            Hi {this.props.firstName}, there's a beacon, would you be able to assist?
          </Text>
          <View style={styles.row}>
            <TouchableHighlight 
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={() => this.props.handleHelpRequestYes(responder)}
              >
              <Text style={styles.missionButtonText}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestNo}
              >
              <Text style={styles.missionButtonText}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.responder.firstName,
  UID: state.myBeacon.UID,
  responderId: state.user.socket,
  responderLocation: state.user.location,
});

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestYes: (responder) => {
    dispatch(acceptBeacon(responder));
    dispatch(drawRoute());
  },
  handleHelpRequestNo: () => {
    dispatch(updateBeacon({ location: null }));
  },
});

HelpRequest = connect(mapStateToProps, mapDispatchToProps)(HelpRequest);

export default HelpRequest;
