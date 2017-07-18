'use strict';

import { getHelp, cancelHelp } from '../../../actions/actions' // JC: do we need this? 

import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import styles from '../../../styles/styles';

class Chat extends Component {
  constructor(props) {
    super(props);
  
  }
  render() {
    return (
      <View style={styles.container}>
             
      </View>
    )    
  }    
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  
});

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)

module.exports = Chat
