import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from '../../../styles/styles';
import wings from '../../../styles/assets/wings.png';
import heart from '../../../styles/assets/heart.png';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
    this.onEmailChange = (event) => {
      this.setState({ email: event.nativeEvent.text });
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    const { email, location } = this.state;
    return (
      <View style={styles.signUp}>
        <View style={styles.flowRight}>
          <Image source={wings} />
          <Text>---------------------</Text>
          <Image source={heart} />
        </View>
        <View style={styles.flowRight}>
          <Icon style={styles.searchIcon} name="mail" size={20} color="#000" />
          <TextInput
            value={this.state.email}
            style={styles.signUpInput}
            onChange={this.onEmailChange}
            placeholder="email address"
          />
        </View>
        <View style={styles.flowRight}>
          <TouchableHighlight
            onPress={() => {
              this.props.setModalVisible(false);
              navigate('Signup', { email, location });
            }}
            style={styles.button}
          >
            <Text style={styles.header}>Get Started, Sign Up</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
export default Signup;
