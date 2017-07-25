import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Button,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { drawRoute, updateBeacon, acceptBeacon, updateUser } from '../../../actions/actions';
import styles from '../../../styles/styles';

class MyProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  };

  static navigationOptions = {
    title: 'Edit Profile',
  }

  render() {
    console.log('+++in MyProfileEdit.js');

    const { navigate } = this.props.navigation;
    
    return (
      <View style={[styles.container]}>     
        <View>
          <Text>Name: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.fullName}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />    
        </View>  

        <View>
          <Text>Organization: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.organization}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />    
        </View>  
        
        
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
  handleEdit: () => {
    dispatch(acceptBeacon(responder));
  },
});

MyProfileEdit = connect(mapStateToProps, mapDispatchToProps)(MyProfileEdit);
export default MyProfileEdit