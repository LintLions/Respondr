'use strict';

import { getHelp, cancelHelp } from '../../../actions/actions' // JC: do we need this? 

import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {ChatEntry} from './ChatEntry.js';

import styles from '../../../styles/styles';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ['test1 message', 'test2 message'],
    }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    // let responder = this.props.responder;
    
    return (
      <View style={styles.container}>
      <Text>CHAT</Text>
      <Text>
        chatRoomID: {this.props.chatRoom}
      </Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <TouchableHighlight
        
        underlayColor='#48BBEC'
        onPress={this.props.handleHelpButtonPress}>
        <Text style={styles.helpButtonText}>SUBMIT</Text>
      </TouchableHighlight>      
      <GiftedChat
        messages={this.state.messages} // this is list of messages to display 
        onSend={(message) => this.onSend(message)} // this send message to backend 
        // user={responder}
        user={{
          _id: 1,
        }}
      />
      </View>
    )    
  }    
}

const mapStateToProps = (state) => ({
  // responder: state.responder.firstName
  chatRoom: state.myBeacon.chatRoom,
})

const mapDispatchToProps = (dispatch) => ({
  
});

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)

module.exports = Chat
