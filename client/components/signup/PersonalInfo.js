import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image,
} from 'react-native';
// import styles from '../../styles/signupStyles';
import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/Entypo';
import {NavigationActions} from "react-navigation";

class PersonalInfoScreen extends Component {
  
  render() {
    return ( 
    <View style={styles.container}>
      <View style={styles.flowRight}>
        <TextInput
          value={this.props.screenProps.firstName}
          style={styles.searchInput}
          onChange={this.props.screenProps.onfirstNameChange}
          placeholder='first name'
        />
        <TextInput
          value={this.props.screenProps.lName}
          style={styles.searchInput}
          onChange={this.props.screenProps.onLNameChange}
          placeholder='last name'
        />
      </View>
      <View style={styles.flowRight}>
        <Icon style={styles.searchIcon} name="mail" size={20} color="#000"/>
        <TextInput
          value={this.props.screenProps.email}
          style={styles.searchInput}
          onChange={this.props.screenProps.onEmailChange}
          placeholder='email address'/>
      </View>
      <View style={styles.flowRight}>
        <Icon style={styles.searchIcon} name="key" size={20} color="#000"/>
        <TextInput
          style={styles.searchInput}
          secureTextEntry={true} 
          value={this.props.screenProps.password}
          onChange={this.props.screenProps.onPasswordChange}
          placeholder='password'
        />
      </View>
      <View style={styles.flowRight}>
        <Icon style={styles.searchIcon} name="phone" size={20} color="#000"/>
        <TextInput
          name='phone'
          style={styles.searchInput}
          value={this.props.screenProps.phone}
          onChange={this.props.screenProps.onPhoneChange}
          placeholder='phone #'/>
      </View>
       <View style={styles.flowRight}>
        <Icon style={styles.searchIcon} name="flag" size={20} color="#000"/>
        <TextInput
          name='organization'
          style={styles.searchInput}
          value={this.props.screenProps.organization}
          onChange={this.props.screenProps.onOrganizationChange}
          placeholder='organization (optional)'/>
      </View>
      <View style={styles.nav}>
        <View style={styles.navArrow}>
          <TouchableHighlight 
            underlayColor='#99d9f4'
            onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Privacy'}))}>
          <Icon style={styles.navIcon} name="arrow-bold-right" size={80} color="#bdd6d3" />
          </TouchableHighlight>  
        </View>
        <View style={styles.flowRight}>
          <Image source={require('../../styles/assets/wings.png')}/>
          <Icon style={styles.navIcon} name="minus" size={40} color="#C5B358"/>
          <Icon style={styles.navIcon} name="minus" size={40} />
          <Icon style={styles.navIcon} name="minus" size={40} />
          <Image source={require('../../styles/assets/heart.png')}/>
         
        </View>
      </View>    

    </View>  
      )
    }
  }  
 export default PersonalInfoScreen;