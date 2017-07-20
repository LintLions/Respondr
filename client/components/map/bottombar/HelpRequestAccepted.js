import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { updateBeacon } from '../../../actions/actions';
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
        </View>
      </View>
    );
  }
}

// this.handleHelpRequestYes = (e) => {
//   e.preventDefault();
//   this.setState({
//     helpRequestStatus: 'yes',
//   });
//   this.props.drawRoute(this.props.beaconLocation);
// };

// this.handleHelpRequestNo = async (e) => {
//   e.preventDefault();
//   this.setState({
//     helpRequestStatus: 'no',
//   });
//   this.props.screenProps.methods.updateState({ beaconLocation: null });
// };

// this.handleHelpRequestCancel = (e) => {
//   e.preventDefault();
//   this.setState({
//     helpRequestCancel: true,
//   });
//   this.props.screenProps.methods.updateState({ beaconLocation: null });
// };

const mapStateToProps = (state) => ({
  firstName: state.responder.firstName,
  beaconLocation: state.myBeacon.location,
});

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestComplete: () => {
    dispatch(updateBeacon({ location: null, completed: true })); 
  },
});

HelpRequestAccepted = connect(mapStateToProps, mapDispatchToProps)(HelpRequestAccepted);

module.exports = HelpRequestAccepted;

