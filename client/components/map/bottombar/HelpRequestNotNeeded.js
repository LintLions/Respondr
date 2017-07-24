import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { updateBeacon, updateUser } from '../../../actions/actions';
import styles from '../../../styles/styles';

class HelpRequestNotNeeded extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('+++in HelpRequestNotNeeded.js');
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.box1]}>
          <Text style={styles.prompt}>
            Thank you so much, the beacon no longer needs help or someone else has already taken the mission!
          </Text>
          <TouchableHighlight 
            style={styles.missionButton}
            underlayColor='#99d9f4'
            onPress={() => this.props.handleReset()}
            >
            <Text style={styles.missionButtonText}>Got It</Text>
          </TouchableHighlight>          
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  handleReset: () => {
    dispatch(updateBeacon({ 
      location: null,
      isCompleted: false,
    }))
  },
});

HelpRequestNotNeeded = connect(mapStateToProps, mapDispatchToProps)(HelpRequestNotNeeded);

module.exports = HelpRequestNotNeeded;

