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
    
    return (
      <View style={[styles.container]}>     
        <Text style={styles.prompt}>{this.props.fullName}</Text>
        <Text style={styles.prompt}>organization: {this.props.organization}</Text>
        <Text style={styles.prompt}>email: {this.props.email}</Text>
        <Text style={styles.prompt}>phone: {this.props.phone}</Text>
        <Text style={styles.prompt}>city: {this.props.city}</Text>
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
  fullName: state.responder.fullName,
  organization: state.responder.organization,
  email: state.responder.email,
  phone: state.responder.phone,
  city: state.responder.city,
});

const mapDispatchToProps = (dispatch) => ({
});

MyProfile = connect(mapStateToProps, mapDispatchToProps)(MyProfile);
export default MyProfile