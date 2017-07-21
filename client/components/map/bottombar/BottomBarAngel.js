import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../../styles/styles';
import HelpRequest from './HelpRequest';
import HelpRequestAccepted from './HelpRequestAccepted';
import HelpRequestNotNeeded from './HelpRequestNotNeeded';
import { updateBeacon, updateUser, getHelp, newGetHelp } from '../../../actions/actions';


class BottomBarAngel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helpRequestStatus: 'default',
      helpRequestCancel: false,
    };
  }

  render() {
    console.log('+++in BottomBarAngel.js')
    console.log('+++in BottomBarAngel.js - chatRoom: ', this.props.chatRoom);
    
    let Page = null;
    if (this.props.isCompleted) {
      Page = <HelpRequestNotNeeded />
    } else if (!this.props.chatRoom) {
      Page = <HelpRequest />;
    } else if (this.props.chatRoom) {
      Page = <HelpRequestAccepted
        firstName={this.props.firstName}
        beaconLocation={this.props.beaconLocation}
        handleHelpRequestComplete={this.props.handleHelpRequestComplete}
        handleCancelMission={this.props.handleHelpRequestComplete}
      />;
    } 
    
    return (
      <View style={styles.container}>
        {Page}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  // isAssigned: state.myBeacon.isAssigned,
  chatRoom: state.myBeacon.chatRoom,
  isCompleted: state.myBeacon.isCompleted,
  firstName: state.responder.firstName,
  beaconLocation: state.myBeacon.location,
})

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestComplete: () => {
    dispatch(updateBeacon({ location: null, isCompleted: true })); 
  },
  handleCancelMission: (options) => {
    // dispatch(updateBeacon({ isAssigned: false }));
    dispatch(getHelp(options));
    dispatch(newGetHelp());
    dispatch(updateBeacon({ location: null}))
  }
});

BottomBarAngel = connect(mapStateToProps, mapDispatchToProps)(BottomBarAngel)

export default BottomBarAngel;
