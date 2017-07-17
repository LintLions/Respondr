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
          <View style={styles.row}>
            <TouchableHighlight
              style={styles.missionButton}
              underlayColor='#99d9f4'
              onPress={this.props.handleHelpRequestCancel}
            >
              <Text style={styles.missionButtonText}>I can't make it anymore</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
this.handleHelpRequestYes = (e) => {
  e.preventDefault();
  this.setState({
    helpRequestStatus: 'yes',
  });
  this.props.drawRoute(this.props.beaconLocation);
};

this.handleHelpRequestNo = async (e) => {
  e.preventDefault();
  this.setState({
    helpRequestStatus: 'no',
  });
  this.props.screenProps.methods.updateState({ beaconLocation: null });
};

this.handleHelpRequestCancel = (e) => {
  e.preventDefault();
  this.setState({
    helpRequestCancel: true,
  });
  this.props.screenProps.methods.updateState({ beaconLocation: null });
};

const styleSheet = StyleSheet.create({
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
  },
  stretch: {
    alignItems: 'stretch'
  }
});

const mapStateToProps = (state) => ({
  firstName: state.responder.firstName,
  beaconLocation: state.myBeacon.location,
});

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestCancel: () => {
    dispatch(updateBeacon({ location: null, isAssigned: false }));
  },
});

HelpRequestAccepted = connect(mapStateToProps, mapDispatchToProps)(HelpRequestAccepted);

module.exports = HelpRequestAccepted;

