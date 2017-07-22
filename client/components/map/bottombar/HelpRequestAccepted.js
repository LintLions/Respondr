import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import styles from '../../../styles/styles';

class HelpRequestAccepted extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('+++in HelpRequestAccepted.js');
    let options = {
      UID: this.props.chatRoom,
    }

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
              onPress={() => this.props.handleCancelMission(options)} // this.props.UID 
            >
              <Text style={styles.missionButtonText}>Cancel Mission</Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    );
  }
}

module.exports = HelpRequestAccepted;

