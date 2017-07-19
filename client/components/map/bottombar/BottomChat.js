import React, { Component } from 'react';
import {
  View,
  Keyboard,
} from 'react-native';
import styles from '../../../styles/styles';
import HelpRequest from './HelpRequest';
import HelpRequestAccepted from './HelpRequestAccepted';
import { messages as testMessages } from '../../../../testData';
import { GiftedChat } from 'react-native-gifted-chat';

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
  }

  render() {
    return (
      <View style={this.state.style}>
        <GiftedChat
          isAnimated={false}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderChatFooter={() => null}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }

}

export default BottomChat;
