import React, { Component } from 'react';
import { Modal, Text, SegmentedControlIOS, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Login from './login';
import Signup from './signup';
import styles from './styles';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false, //is the modal visible?
      buttonVisible: true, //is the buttion for calling the modal visible?
      selectedIndex: 0,
      location: this.props.location,
    }

  this.setModalVisible = (visible) => { //hide modal and button
    this.setState({modalVisible: visible, buttonVisible: !visible});
  }

  this.onLoginPressed = () => {  //server auth
    alert("cool!");
  }  
}

  render() {
    return (
      <View style={styles.container}>
     
        <Modal //the modal component
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
          >
          <TouchableWithoutFeedback onPress={() => this.setModalVisible(!this.state.modalVisible) }> 
            <View style={styles.loginModal}>
              <TouchableWithoutFeedback>
                <View style={styles.loginModalInner}>
                  <SegmentedControlIOS
                    style-={styles.header}
                    values={['Login', 'Signup']}
                    selectedIndex={this.state.selectedIndex}
                    onChange={(event) => {
                    this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
                    }}
                  />
                  {this.state.selectedIndex === 0 &&  //LOGIN
                    <Login />
                  } 
             
                  {this.state.selectedIndex === 1 &&  //SIGNUP
                    <Signup navigation={this.props.navigation} setModalVisible={this.setModalVisible.bind(this)} />
                  } 
                  {//<TouchableHighlight 
                  //   style={styles.hideButton}
                  //   onPress={() => {
                  //   this.setModalVisible(!this.state.modalVisible)
                  // }}>
                  //   <Icon name="arrow-bold-down" size={30} color="#000000" />
                  // </TouchableHighlight>
                }
                </View>
              </TouchableWithoutFeedback>
            </View>    
          </TouchableWithoutFeedback>
        </Modal>

        {this.state.buttonVisible && <View style={styles.IconContainer}>
            <Text>Login</Text>
              <TouchableHighlight 
                onPress={() => {this.setModalVisible(true)
              }}>
              <Icon name="feather" size={40} color="#4F8EF7" style={styles.icon} />
        </TouchableHighlight>
          <Text>Signup</Text>
        </View> }

      </View>
    );
  }
}

export default TopBar