// import React, { Component } from 'react'
// import { GiftedChat } from 'react-native-gifted-chat';
// import { socket } from '../../helpers';

// class Chat extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//     };
//     this.onSend = this.onSend.bind(this);
//   }
  
//   componentWillMount() {
//     this.setState({
//       messages: [
//         {
//           _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://facebook.github.io/react/img/logo_og.png',
//           },
//         },
//       ],
//     });

//     socket.on('server:messages', (messages) => {
//       this.setState({
//         messages: messages
//       })
//     })
//   }
  
//   onSend(messages = []) {
//     socket.emit('message', messages[0]);
//     this.setState((previousState) => {
//       return {
//         messages: GiftedChat.append(previousState.messages, messages),
//       };
//     });
//   }
//   render() {
//     console.log('Chat.js - messages: ', this.state.messages);
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={this.onSend}
//         user={{
//           _id: 1,
//         }}
//       />
//     );
//   }
// }

// export default Chat;


















'use strict';

import { getHelp, cancelHelp, firstMessage } from '../../../actions/actions' // JC: do we need this? 

import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  StyleSheet,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { ChatEntry } from './ChatEntry.js';
import { socket } from '../../helpers';

import styles from '../../../styles/styles';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.getAllMessages = this.getAllMessages.bind(this);
  }

  componentWillMount() {
    socket.emit('get all messages')
  }

  sendMessage() {
    var eachMessage = {
      message: this.state.message,
      chatRoom: this.state.chatRoom
    }
    // socket.emit('new message', this.state.message);
    socket.emit('new message', eachMessage);
    console.log('++sendMessage is executed');

    this.setState({
      message: ''
    })

    socket.on('render all messages', (messages) => {
      this.setState({
        messages
      })
    })
  }

  getAllMessages() {
    socket.on('render all messages', (messages) => {
      this.setState({
        messages
      })
    });
  }

  render() {
    
    socket.on('render all messages', (messages) => {
      this.setState({
        messages
      })
    });

    return (
      <View>
        <Text>CHAT</Text>
        <Text>
          chatRoomID: {this.props.chatRoom}
        </Text>
        <FlatList
          data={this.state.messages}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => <Text>{item}</Text>}
        />
        <TextInput
          style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(message) => {
            this.setState({message});
            this.getAllMessages();
          }}
          value={this.state.message}
        />
        <TouchableHighlight
          style={styles.missionButton}
          underlayColor='#48BBEC'
          onPress={this.sendMessage}>
          <Text style={styles.missionButtonText}>SUBMIT</Text>
        </TouchableHighlight>      
      </View>
    )    
  }    
}

const mapStateToProps = (state) => ({
  chatRoom: state.myBeacon.chatRoom,
})

const mapDispatchToProps = (dispatch) => ({
});

Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)

module.exports = Chat
