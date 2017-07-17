'use strict';

import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';

import HelpRequestAccepted from './HelpRequestAccepted';
import AngelStatusPage from './AngelStatusPage';
import { drawRoute, updateBeacon } from '../../../actions/actions';

// props received: username, beaconLocation
// props to pass down: yes/no to help request 

class HelpRequest extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    console.log('+++HelpRequest.js');
    
    return (
      <View style={styles.container}>
        
        <View style={styles.box1}>
          <Text style={styles.prompt}>
            Hi {this.props.fName}, there's a beacon, would you be able to assist?
          </Text>
          <View style={styles.buttonDirection}>
            <TouchableHighlight 
              style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestYes}
              >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestNo}
              >
              <Text style={styles.buttonText}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    flex: 1,
    height: 222,
    padding: 20,
    justifyContent: 'center',
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
  fName: state.responder.fName,
  beaconLocation: state.myBeacon.location,
});

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestYes: () => {
    dispatch(drawRoute());
    dispatch(updateBeacon({ isAssigned: true }));
  },
  handleHelpRequestNo: () => {
    dispatch(updateBeacon({ location: null }));
  },
});

HelpRequest = connect(mapStateToProps, mapDispatchToProps)(HelpRequest);

export default HelpRequest;
