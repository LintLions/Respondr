import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList
} from 'react-native';
import { drawRoute, updateBeacon, acceptBeacon } from '../../../actions/actions';

import styles from '../../../styles/styles';

class HelpRequest extends Component {
  constructor(props) {
    super(props);
  };


  render() {
    console.log('+++HelpRequest.js');
    
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
              onPress={() => this.props.handleHelpRequestYes()}
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
  beaconLocation: state.myBeacon.location,
});

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestYes: () => {
    dispatch(acceptBeacon());
    dispatch(drawRoute());
    dispatch(updateBeacon({ isAssigned: true }));
  },
  handleHelpRequestNo: () => {
    dispatch(updateBeacon({ location: null }));
  },
});

HelpRequest = connect(mapStateToProps, mapDispatchToProps)(HelpRequest);

export default HelpRequest;
