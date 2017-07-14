import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, AlertIOS} from 'react-native';
import styles from '../../../styles/styles.js';
import Icon from 'react-native-vector-icons/Entypo';
import config from '../../config.js';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
    }
    this.onEmailChange = (event)  => {
        this.setState({ email: event.nativeEvent.text });
      };
    this.onPasswordChange = (event)  => {
      this.setState({ password: event.nativeEvent.text });
    };
    this.onLoginPressed = (event) => {
      this.login();
    }
    this.login = () => {
      fetch(`${config.url}/users/sessions/create`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          socket: this.props.screenProps.socket.id,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.user) {
            this.props.screenProps.methods.updateToken(responseData.user.token);
            this.props.screenProps.methods.updateState({
              user: responseData.user,
              isLoggedIn: true,
            });
            AlertIOS.alert('Login Success!');
          } else {
            AlertIOS.alert('Login Failed!', responseData.error);
          }
        })
        .done();
    }
  }

  render() {
    return (
      <View>
         <View style={styles.flowRight}>
         <Icon style={styles.searchIcon} name="mail" size={20} color="#000"/>
          <TextInput
            value={this.state.email}
            style={styles.searchInput}
            onChange={this.onEmailChange}
            placeholder='email address'/>
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            secureTextEntry={true} 
            value={this.state.password}
            onChange={this.onPasswordChange}
            placeholder='password'/>
          <TouchableHighlight 
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onLoginPressed}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>  
      </View>
    )
  }  
}

export default Login;  


