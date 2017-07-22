import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../../styles/styles';
import HelpRequest from './HelpRequest';
import HelpRequestAccepted from './HelpRequestAccepted';
import HelpRequestNotNeeded from './HelpRequestNotNeeded';
import { updateBeacon, updateUser, getHelp } from '../../../actions/actions';


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
    console.log('+++in BottomBarAngel.js - isAssigned: ', this.props.isAssigned);
    
    let Page = null;
    if (this.props.isCompleted) {
      Page = <HelpRequestNotNeeded />
    } else if (!this.props.isAssigned) { 
      Page = <HelpRequest />;
    } else if (this.props.isAssigned) { 
      Page = <HelpRequestAccepted
        UID={this.props.UID}
        responderId={this.props.responderId}
        responderLocation={this.props.responderLocation}

        firstName={this.props.firstName}
        beaconLocation={this.props.beaconLocation}
        chatRoom={this.props.chatRoom}
        handleHelpRequestComplete={this.props.handleHelpRequestComplete}
        handleCancelMission={this.props.handleCancelMission}
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
  isAssigned: state.myBeacon.isAssigned,
  // chatRoom: state.myBeacon.chatRoom,
  isCompleted: state.myBeacon.isCompleted,
  firstName: state.responder.firstName,
  beaconLocation: state.myBeacon.location,

  UID: state.myBeacon.UID,
  responderId: state.user.socket,
  responderLocation: state.user.location,
})

const mapDispatchToProps = (dispatch) => ({
  handleHelpRequestComplete: () => {
    dispatch(updateBeacon({ location: null, isCompleted: true })); 
  },
  
  handleCancelMission: (responder) => {
    dispatch(getHelp(responder));
    
    // dispatch(updateBeacon({ isAssigned: false }));
    dispatch(updateBeacon({ location: null}))
  }
});

BottomBarAngel = connect(mapStateToProps, mapDispatchToProps)(BottomBarAngel)

export default BottomBarAngel;
