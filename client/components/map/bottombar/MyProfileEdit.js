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
import { StackNavigator, NavigationActions } from 'react-navigation';
import { drawRoute, updateBeacon, acceptBeacon, updateUser, editProfile, updateState } from '../../../actions/actions';
import styles from '../../../styles/styles';

class MyProfileEdit extends Component {
  
  static navigationOptions = {
    title: 'Edit Profile',
  }  

  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      phone: '',
      organization: '',
      privacy: '',
      mobility: '',
      city: '',
      address: '',
      zip: '',
      fullName: '',
      state: '',
    }

    this.onEmailChange = (e) => {
      const email = e.nativeEvent.text;
      this.setState({ email });
    };
    this.onFNameChange = (e) => {
      console.log(e.nativeEvent);
      const firstName = e.nativeEvent.text;
      this.setState({ firstName });
    };
    this.onLNameChange = (e) => {
      const lastName = e.nativeEvent.text;
      this.setState({ lastName });
    };
    this.onPasswordChange = (e) => {
      const password = e.nativeEvent.text;
      this.setState({ password });
    };
    this.onPhoneChange = (e) => {
      const phone = e.nativeEvent.text;
      this.setState({ phone });
    };
    this.onOrganizationChange = (e) => {
      const organization = e.nativeEvent.text;
      this.setState({ organization });
    };
    this.onPrivacyChange = (e) => {
      const privacy = e.nativeEvent.selectedSegmentIndex;
      this.setState({ privacy });
    };
    this.onMobilityChange = (e) => {
      const mobility = e.nativeEvent.selectedSegmentIndex;
      console.log("mobility is ", mobility);
      this.setState({ mobility });
    };
    this.onfullNameChange = (e) => {
      const fullName = e.nativeEvent.text;
      this.setState({ fullName });
    };
    this.onAddressChange = (e) => {
      const address = e.nativeEvent.text;
      this.setState({ address });
    };
    this.onCityChange = (e) => {
      const city = e.nativeEvent.text;
      this.setState({ city });
    };
    this.onStateChange = (e) => {
      const state = e.nativeEvent.text;
      this.setState({ state });
    };
    this.onZipChange = (e) => {
      const zip = e.nativeEvent.text;
      this.setState({ zip });
    };
    this.submitEdit = () => {
      const userData = this.state;
      console.log('+++userdata on MyProfileEdit is ', userData);
      this.props.handleEdit(userData);
      this.props.goHome();
    };    
  };

  render() {
    console.log('+++in MyProfileEdit.js');

    const { navigate } = this.props.navigation;
    
    return (
      <View style={[styles.container]}>     
        <View>
          <Text>First Name: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.firstName}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
          />    
        </View>  

        <View>
          <Text>Last Name: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.lastName}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
          />    
        </View>  
        
        <View>
          <Text>Organization: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.organization}
            onChangeText={(organization) => this.setState({organization})}
            value={this.state.organization}
          />    
        </View>  

        <View>
          <Text>Phone: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.phone}
            onChangeText={(phone) => this.setState({phone})}
            value={this.state.phone}
          />    
        </View>  

        <View>
          <Text>Email: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.email}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />    
        </View>  

        <View>
          <Text>Privacy: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={this.props.state}
            onChangeText={(state) => this.setState({state})}
            value={this.state.state}
          />    
        </View>    

        <Button
          title="Done"
          onPress={this.submitEdit}
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
  handleEdit: (userData) => {
    dispatch(editProfile(userData));
    // dispatch(updateState(userData));
  },
  goHome: () => {
    dispatch(NavigationActions.navigate({ routeName: 'Home' }));
  },
});

MyProfileEdit = connect(mapStateToProps, mapDispatchToProps)(MyProfileEdit);
export default MyProfileEdit