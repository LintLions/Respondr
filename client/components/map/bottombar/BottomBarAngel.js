import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../../styles/styles';
import HelpRequest from './HelpRequest';
import HelpRequestAccepted from './HelpRequestAccepted';

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
    if (!this.props.chatRoom) {
      Page = <HelpRequest />;
    } else if (this.props.chatRoom) {
      Page = <HelpRequestAccepted />;
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
})

// const mapDispatchToProps = (dispatch) => ({
// });

BottomBarAngel = connect(mapStateToProps)(BottomBarAngel)

export default BottomBarAngel;
