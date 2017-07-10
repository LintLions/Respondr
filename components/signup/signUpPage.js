'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  SegmentedControlIOS,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  AlertIOS
} from 'react-native';
import MapPage from '../MapPage';
import styles from './signupStyles';
import Icon from 'react-native-vector-icons/Entypo';
import config from '../config.js';

class SignUpPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Signup for ${navigation.state.params.email}`,
  });
 constructor(props) {
    super(props);
    this.state = {
     email:this.props.navigation.state.params.email
   };
    this.onSignupChange = this.onSignupChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.signup = () => {
      fetch(`${config.url}/users`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          this.props.screenProps.methods.updateToken(responseData.id_token),
          AlertIOS.alert(
            "Signup Success!",
            JSON.stringify(responseData)
          )
        })
        .done();
    }
  }  

  onSignupChange(p, event) {
    const value = event.nativeEvent.text;
    const key = p;
    
     this.setState({
      [key] : value
    });

  }
  onEmailChange(event) {
    this.setState({ email: event.nativeEvent.text });
  };
  
  render() {
    return ( 
     <View style={styles.container}>
      <View style={styles.flowRightImage}>
      <Image source={require('../../assets/bigwing.png')}/>
        </View>
      <View style={styles.flowRight}>
        <TextInput
          value={this.state.fName}
          style={styles.searchInput}
          onChange={this.onSignupChange.bind(this, 'fName')}
          placeholder='first name'
        />
        <TextInput
          value={this.state.lName}
          style={styles.searchInput}
          onChange={this.onSignupChange.bind(this, 'lName')}
          placeholder='last name'
        />
        </View>
        <View style={styles.flowRight}>
         <Icon style={styles.searchIcon} name="mail" size={20} color="#000"/>
          <TextInput
            value={this.state.email}
            style={styles.searchInput}
            onChange={this.onEmailChange}
            placeholder='email address'/>
        </View>
        <View style={styles.flowRight}>
          <Icon style={styles.searchIcon} name="key" size={20} color="#000"/>
          <TextInput
            style={styles.searchInput}
            secureTextEntry={true} 
            value={this.state.password}
            onChange={this.onSignupChange.bind(this, 'password')}
            placeholder='password'/>
        </View>
        <View style={styles.flowRight}>
         <Icon style={styles.searchIcon} name="phone" size={20} color="#000"/>
          <TextInput
            name='phone'
            style={styles.searchInput}
            value={this.state.phone}
            onChange={this.onSignupChange.bind(this, 'phone')}
            placeholder='phone #'/>
        </View>
         <View style={styles.flowRight}>
           <Icon style={styles.searchIcon} name="flag" size={20} color="#000"/>
          <TextInput
            name='organization'
            style={styles.searchInput}
            value={this.state.organization}
            onChange={this.onSignupChange.bind(this, 'organization')}
            placeholder='organization (optional)'/>
        </View>
        <View style={styles.toggle}>
         <SegmentedControlIOS
            style-={styles.header}
            values={['Public', 'Private']}
            selectedIndex={this.state.public}
            onChange={(event) => {
            this.setState({public: event.nativeEvent.selectedSegmentIndex});
            }}
          />
         </View>
          <View style={styles.toggle}> 
           <SegmentedControlIOS
            style-={styles.header}
            values={['Dynamic', 'Static']}
            selectedIndex={this.state.static}
            onChange={(event) => {
            this.setState({static: event.nativeEvent.selectedSegmentIndex});
            }}
          />
         </View> 
         {this.state.static === 1 && 
         <View> 
           <View style={styles.flowRight}>
           <Icon style={styles.searchIcon} name="home" size={20} color="#000"/>
            <TextInput
              name='Street Address'
              style={styles.searchInput}
              value={this.state.address}
              onChange={this.onSignupChange.bind(this, 'address')}
              placeholder='Street Address'/>
          </View>
          <View style={styles.flowRight}>
            <TextInput
              name='City'
              style={styles.searchInput}
              value={this.state.city}
              onChange={this.onSignupChange.bind(this, 'city')}
              placeholder='City'/>
            <TextInput
              name='State'
              style={styles.searchInput}
              value={this.state.state}
              onChange={this.onSignupChange.bind(this, 'state')}
              placeholder='State'/>
          </View>
           <View style={styles.flowRight}>
           <TextInput
              name='Zip Code'
              style={styles.searchInput}
              value={this.state.zip}
              onChange={this.onSignupChange.bind(this, 'zip')}
              placeholder='Zip Code'/>
            </View>  
         </View>  
         }
         <TouchableHighlight 
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.signup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight> 
       </View>  
      )
    }
  }  
 export default SignUpPage;