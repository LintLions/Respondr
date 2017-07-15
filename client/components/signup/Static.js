import React, { Component } from 'react';
import {
  SegmentedControlIOS,
  TextInput,
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
// import styles from '../../styles/signupStyles';
import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/Entypo';


class StaticScreen extends Component {
  render() {
    return (
    <View style={styles.container}> 
      <Text style={styles.header}> Choose Between: </Text>
      <View style={styles.toggle}>
      <SegmentedControlIOS
          style-={styles.header}
          values={['Dynamic', 'Static']}
          selectedIndex={this.props.screenProps.mobility}
          onChange={this.props.screenProps.onMobilityChange}
        />
      </View>
          
      {this.props.screenProps.state.mobility === 1 && 

        <View> 
          <View>
            <Text style={styles.bold}>Be a fixed point on the map</Text>
            <Text style={styles.explainer}> Whether your are a pharmacy, a clinic, or just want
            to be a good neighbor, select this option to become a static resource on Responder. 
            </Text>
          </View>
          <View style={styles.flowRight}>
          <Icon style={styles.searchIcon} name="home" size={20} color="#000"/>
            <TextInput
              name='Street Address'
              style={styles.searchInput}
              value={this.props.screenProps.address}
              onChange={this.props.screenProps.onAddressChange}
              placeholder='Street Address'/>
          </View>
          <View style={styles.flowRight}>
            <TextInput
              name='City'
              style={styles.searchInput}
              value={this.props.screenProps.city}
              onChange={this.props.screenProps.onCityChange}
              placeholder='City'/>
            <TextInput
              name='State'
              style={styles.searchInput}
              value={this.props.screenProps.state}
              onChange={this.props.screenProps.onStateChange}
              placeholder='State'/>
          </View>
           <View style={styles.flowRight}>
           <TextInput
              name='Zip Code'
              style={styles.searchInput}
              value={this.props.screenProps.zip}
              onChange={this.props.screenProps.onZipChange}
              placeholder='Zip Code'/>
            </View>  
         </View>  
         }
         {this.props.screenProps.state.mobility === 0 && 
            <View>
              <Text style={styles.bold}>Be Mobile</Text>
              <Text style={styles.explainer}> Your position will update automatically. When you set the app to
              active mode you will be able to respond to calls for help wherever you may be. 
              </Text>
            </View>
         }
        <View style={styles.navArrow}>
         <TouchableHighlight 
            style={styles.signUpButton}
            underlayColor='#99d9f4'
            onPress={this.props.screenProps.signup}>
            <Text style={styles.header}>Signup</Text>
          </TouchableHighlight>  
        </View>  

          <View style={styles.nav}>
        <View style={styles.flowRight}>
          <Image source={require('../../styles/assets/wings.png')}/>
          <Icon style={styles.navIcon} name="minus" size={40} />
          <Icon style={styles.navIcon} name="minus" size={40} />
          <Icon style={styles.navIcon} name="minus" size={40} color="#C5B358"/>
          <Image source={require('../../styles/assets/heart.png')}/>
         
        </View>
      </View> 
    </View>       
    )
  }    
}

export default StaticScreen;  

