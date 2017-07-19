import React, { Component } from 'react';
import {
  View,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../../styles/styles';
import HelpRequest from './HelpRequest';
import HelpRequestAccepted from './HelpRequestAccepted';
import { messages as testMessages } from '../../../../testData';
import { GiftedChat } from 'react-native-gifted-chat';
import { socket } from '../../helpers';

class BottomChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      style: styles.box1,
    };
    this._keyboardWillShow = () => {
      this.setState({ style: styles.box2 });
    }
    this._keyboardWillHide = () => {
      console.log('hide');
      this.setState({ style: styles.box1 });
    }
  }
  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }
  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    console.log('+++messages in onSend: ', messages);

    var eachMessage = {
      ...messages[0],
      chatRoom: this.props.chatRoom
    }
    socket.emit('new message', eachMessage);
  }

  render() {
    return (
      <View style={this.state.style}>
        <GiftedChat
          isAnimated={false}
          messages={this.props.messages}
          onSend={(messages) => this.onSend(messages)}
          renderChatFooter={() => null}
          user={{
            _id: 1,
            name: this.props.name === ' ' ? null : this.props.name,
          }}
        />
      </View>
    );
  }

}

const mapStateToProps = (state) => ({
  chatRoom: state.myBeacon.chatRoom,
  messages: state.myBeacon.chatMessages,
  name: state.responder.fullName,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BottomChat);

// sendMessage() {
//     var eachMessage = {
//       message: this.state.message,
//       chatRoom: this.state.chatRoom
//     }
//     // socket.emit('new message', this.state.message);
//     socket.emit('new message', eachMessage);
//     console.log('++sendMessage is executed');

//     this.setState({
//       message: ''
//     })

//     socket.on('render all messages', (messages) => {
//       this.setState({
//         messages
//       })
//     })
//   }