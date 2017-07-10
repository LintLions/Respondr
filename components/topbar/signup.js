import React, { Component } from 'react';
import {Picker, Image, Text, TextInput, View, TouchableHighlight, SegmentedControlIOS} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';
import SignUpPage from '../signup/signUpPage';

class Signup extends Component { 
  constructor(props) {
    super(props);

    this.state = { 
      email: ''
    }
    
    this.onEmailChange = (event)  => {
      this.setState({ email: event.nativeEvent.text });
    };
  }
    
  render() {
     const {navigate} = this.props.navigation;
    return (
      <View style ={styles.signUp}>
      
        <View style={styles.flowRight}>
          <Image source={require('../../assets/wings.png')} />
          <Text>---------------------</Text>
          <Image source={require('../../assets/heart.png')} />
        </View>  
        <View style={styles.flowRight}>  
          <Icon style={styles.searchIcon} name="mail" size={20} color="#000"/>
          <TextInput
            value={this.state.email}
            style={styles.signUpInput}
            onChange={this.onEmailChange}
            placeholder='email address'/>
        </View>
        <View style={styles.flowRight}>  
          <TouchableHighlight
            onPress={() => {
             this.props.setModalVisible(false);
              navigate('Signup', { email: this.state.email, location: this.props.location })}}
            style={styles.button}>
            <Text style={styles.header}>Get Started, Sign Up</Text>
          </TouchableHighlight>  
        </View>
      </View>
    )
  }
}      
export default Signup    