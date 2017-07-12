import React, { Component } from 'react';
import {
  SegmentedControlIOS,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import {NavigationActions} from "react-navigation";
import styles from '../../styles/signupStyles';
import Icon from 'react-native-vector-icons/Entypo';

class PublicScreen extends Component {
  render() {
    return ( 
    <View style={styles.container}>  
     <Text style={styles.header}> Choose Between: </Text>
      <View style={styles.toggle}> 
        <SegmentedControlIOS
          style-={styles.header}
          values={['Public', 'Private']}
          selectedIndex={this.props.screenProps.privacy}
          onChange={this.props.screenProps.onPrivacyChange}
        />
      </View> 
      {this.props.screenProps.state.privacy === 0 && 
        <View>
        <Text style={styles.bold}>Be Visible to Everyone</Text>
        <Text style={styles.explainer}> You are a life-saving rockstar.
         When you set your status to active anyone can see you and ask for help. 
         </Text>
        </View>
      }

      {this.props.screenProps.state.privacy === 1 && 
        <View>
        <Text style={styles.bold}>Be a Helpful Ghost</Text>
        <View style={styles.flowRight}>
          <Text style={styles.explainer}> No one can see you unless you have agreed to help them out.
            After you've finished your mission you'll go back to being invisible and anonymous. 
            You rock.
           </Text>
        </View> 
        </View>
      }
      <View style={styles.nav}>
      <View style={styles.navArrow}>
          <TouchableHighlight 
            underlayColor='#99d9f4'
            onPress={() => {this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Location'}))}}>
          <Icon style={styles.navIcon} name="arrow-bold-right" size={80} color="#bdd6d3" />
          </TouchableHighlight>  
        </View>
        <View style={styles.flowRight}>
          <Image source={require('../../styles/assets/wings.png')}/>
          <Icon style={styles.navIcon} name="minus" size={40} />
          <Icon style={styles.navIcon} name="minus" size={40} color="#C5B358"/>
          <Icon style={styles.navIcon} name="minus" size={40} />
          <Image source={require('../../styles/assets/heart.png')}/>
         
        </View>
      </View> 
    </View>     
    )
  }    
}

export default PublicScreen;
