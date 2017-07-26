import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { drawRoute, updateBeacon, acceptBeacon, updateUser } from '../../../actions/actions';

import styles from '../../../styles/styles';

class MyProfile extends Component {
  constructor(props) {
    super(props);
  };

  static navigationOptions = {
    title: 'My Profile',
  }

  render() {
    console.log('+++in HelpRequest.js');

    const { navigate } = this.props.navigation;
    
    let privacy;
    if(this.props.privacy) {
      privacy = 'private';
    } else {
      privacy = 'public';
    }
    
    let mobility;
    if(this.props.mobility === 1) {
      mobility = 'dynamic individual';
    } else {
      mobility = 'static storefront';
    }
    
    return (
      <View style={[styles.container]}>     
        <Text style={styles.prompt}>{this.props.firstName} {this.props.lastName}</Text>
        <Text style={styles.prompt}>organization: {this.props.organization}</Text>
        <Text style={styles.prompt}>phone: {this.props.phone}</Text>
        <Text style={styles.prompt}>email: {this.props.email}</Text>
        <Text style={styles.prompt}>privacy setting: {privacy}</Text>
        <Button
          title="Edit Profile"
          onPress={() =>
            navigate('ProfileEdit')
          }
        />           
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.responder.firstName,
  lastName: state.responder.lastName,

  organization: state.responder.organization,
  phone: state.responder.phone,
  email: state.responder.email,
  
  privacy: state.responder.privacy,

  socket: state.user.socket,
});

const mapDispatchToProps = (dispatch) => ({
});

MyProfile = connect(mapStateToProps, mapDispatchToProps)(MyProfile);
export default MyProfile