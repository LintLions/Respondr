import React, { Component } from 'react';
import { Modal,
  Text,
  SegmentedControlIOS,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  View,
  StyleSheet,
  AlertIOS,
  AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Login from './login';
import Signup from './signup';
import config from '../../config.js';
import styles from '../../../styles/styles.js';
import { logOut } from '../../../actions/actions.js';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false, // is the modal visible?
      buttonVisible: true, // is the buttion for calling the modal visible?
      selectedIndex: 0,
    }

    this.setModalVisible = (visible) => { //hide modal and button
      this.setState({modalVisible: visible, buttonVisible: !visible});
    };

    this.logout = async () => {
      try {
        await AsyncStorage.removeItem('id_token');
        AlertIOS.alert("Logout Success!")
        this.props.handleIsLoggedIn();
      } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal // the modal component
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={
              () => this.setModalVisible(!this.state.modalVisible)
            }
          >
            <View style={styles.loginModal}>
              <TouchableWithoutFeedback>
                <View style={styles.loginModalInner}>
                {this.props.isLoggedIn && 
                  <View style={styles.container}>
                   <TouchableHighlight 
                    onPress={this.logout}>
                    <Text>Logout</Text>
                  </TouchableHighlight>  
                </View>  
                } 
                {!this.props.isLoggedIn &&  
                  <View>  
                  <SegmentedControlIOS
                    style-={styles.header}
                    values={['Login', 'Signup']}
                    selectedIndex={this.state.selectedIndex}
                    onChange={(event) => {
                    this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                    }}
                  />
                  {this.state.selectedIndex === 0 &&  //LOGIN
                    <Login setModalVisible={this.setModalVisible} />
                  } 
             
                  {this.state.selectedIndex === 1 &&  //SIGNUP
                    <Signup setModalVisible={this.setModalVisible} />
                  } 
                </View>
               } 
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {this.state.buttonVisible && <View style={styles.IconContainer}>
          {!this.props.isLoggedIn &&  <Text>Login</Text>}
         
          <TouchableHighlight 
            onPress={() => {this.setModalVisible(true)
          }}>
          <Icon name="feather" size={40} color="#4F8EF7" style={styles.icon} />
          </TouchableHighlight>
          {!this.props.isLoggedIn &&  <Text>Signup</Text>}
        </View> }
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn

})

const mapDispatchToProps = (dispatch) => ({
  handleIsLoggedIn: () => {
    dispatch(logOut());
  }
})

TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBar)

export default TopBar