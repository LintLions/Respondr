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

class HelpRequestAccepted extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.container, styles.box1]}>
          <Text style={styles.prompt}>
            You're an angel {this.props.firstName}!
          </Text>
          <View>
            <TouchableHighlight
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestComplete}
            >
              <Text style={styles.missionButtonText}>Mission Complete</Text>
            </TouchableHighlight>
          </View>

          <View>
            <TouchableHighlight
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={this.props.handleCancelMission}
            >
              <Text style={styles.missionButtonText}>Cancel Mission</Text>
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
  handleHelpRequestComplete: () => {
    dispatch(updateBeacon({ location: null, isCompleted: true })); 
  },
  handleCancelMission: () => {
    // dispatch(updateBeacon({ isAssigned: false }));
  }
});

HelpRequestAccepted = connect(mapStateToProps, mapDispatchToProps)(HelpRequestAccepted);

module.exports = HelpRequestAccepted;

