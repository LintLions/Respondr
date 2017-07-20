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
    let Page = null;
    if (!this.props.isAssigned) {
      Page = <HelpRequest />;
    } else if (this.props.isAssigned) {
      if (this.props.isAssigned) {
        Page = <HelpRequestAccepted />;
      }
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
})

// const mapDispatchToProps = (dispatch) => ({
// });

BottomBarAngel = connect(mapStateToProps)(BottomBarAngel)

export default BottomBarAngel;
