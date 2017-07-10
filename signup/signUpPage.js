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
  Image
} from 'react-native';
import MapPage from '../MapPage';
import styles from './signupStyles';
import Icon from 'react-native-vector-icons/Entypo';

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
  }  

  onSignupChange(p, event) {
    const value = event.nativeEvent.text;
    const key = p;
    
     this.setState({
      key : value
    });

  }
  onEmailChange(event) {
    this.setState({ email: event.nativeEvent.text });
  };
  
  render() {
    return ( 
     <View style={styles.container}>
      <View style={styles.flowRightImage}>
      <Image source={require('../bigwing.png')}/>
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
       </View>  
      )
    }
  }  
 export default SignUpPage;