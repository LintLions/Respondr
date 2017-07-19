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
import {ChatEntry} from './ChatEntry.js';
import { socket } from '../../helpers';

import styles from '../../../styles/styles';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
    }
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentWillMount() {
    socket.on('server:message', 
      (messages) => {
        this.setState({
          messages
        })
        objDiv[0].scrollTop = objDiv[0].scrollHeight;
      }
    )

    socket.on('server:new message',
      (msg) => {
        var newMessage = this.state.messages;
        newMessage.push(msg);
        this.setState({
          messages: newMessage
        })
        objDiv[0].scrollTop = objDiv[0].scrollHeight;
      }
    )
  }


  setMessage(e) {
    this.setState({
      message: e.target.value
    })
  }

  sendMessage(e) {
    e.preventDefault();
    var eachMessage = {
      message: this.state.message,
      user_id: this.props.self,
      friend: this.props.friend
    }

    socket.emit('new message', eachMessage);

    this.setState({
      message: ''
    })
  }

  render() {
    // let responder = this.props.responder;
    
    return (
      <View style={styles.container}>
        <Text>CHAT</Text>
        <Text>
          chatRoomID: {this.props.chatRoom}
        </Text>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
          ]}
          extraData={this.state}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        <TextInput
          style={{height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableHighlight
          
          underlayColor='#48BBEC'
          onPress={this.props.getFirstMessage}>
          <Text style={styles.helpButtonText}>SUBMIT</Text>
        </TouchableHighlight>      
      </View>
    )    
  }    
}

// const mapStateToProps = (state) => ({
//   // responder: state.responder.firstName
//   chatRoom: state.myBeacon.chatRoom,
// })

// const mapDispatchToProps = (dispatch) => ({
// });

// Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)

module.exports = Chat
