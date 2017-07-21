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
            Thank you so much, but someone else has already taken the mission!
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
});

HelpRequestNotNeeded = connect(mapStateToProps, mapDispatchToProps)(HelpRequestNotNeeded);

module.exports = HelpRequestNotNeeded;

