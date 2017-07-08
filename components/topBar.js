import React, { Component } from 'react';
import { Modal, Text, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      buttonVisible: true,
      username: '',
      password: '',
    }

  this.setModalVisible = (visible) => {
    this.setState({modalVisible: visible, buttonVisible: !visible});
  }
  this.onUsernameChange = (event)  => {
     this.setState({ username: event.nativeEvent.text });
  };
  this.onPasswordChange = (event)  => {
    this.setState({ password: event.nativeEvent.text });
  };

  this.onLoginPressed = () => { 
    alert("cool!");
  }  
}

  render() {
    return (
      <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => console.log("I'm clicked") }>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
          >
       
        <View style={styles.loginModal}>
          <Text style={styles.header}>Login</Text>
          <View style={styles.flowRight}>
          
            <TextInput
              style={styles.searchInput}
              value={this.state.username}
              onChange={this.onUsernameChange}
              placeholder='username'/>
         
          </View>
          <View style={styles.flowRight}>
            <TextInput
              style={styles.searchInput}
              secureTextEntry={true} 
              value={this.state.password}
              onChange={this.onPasswordChange}
              placeholder='password'/>
            <TouchableHighlight 
              style={styles.button}
              underlayColor='#99d9f4'
              onPress={this.onLoginPressed}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableHighlight>
        
            <TouchableHighlight 
              style={styles.button}
              onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text style={styles.buttonText}>Hide</Text>
            </TouchableHighlight>
          </View>
          <Text style={styles.header}>Or</Text>
          <View style={styles.flowRight}>
          
            <TouchableHighlight
              style={styles.signupButton}>
            <Text style={styles.header}>Signup</Text>
           </TouchableHighlight> 
          </View> 
         </View>  

        </Modal>
 </TouchableWithoutFeedback>
      {this.state.buttonVisible && <View style={styles.IconContainer}>
          <Text>Login / Signup</Text>
            <TouchableHighlight 
              onPress={() => {this.setModalVisible(true)
            }}>
            <Icon name="feather" size={40} color="#4F8EF7" style={styles.icon} />
          </TouchableHighlight>
        </View> }

      </View>
    );
  }
}
var styles = StyleSheet.create({
  signupButton:{
      height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'cyan',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  loginModal:{
          flex: 1,
          flexDirection: 'column',
          marginTop:65,
          alignItems: 'center'
  },
  header:{
    fontSize:24,
    fontWeight:'bold'
  },
  IconContainer:{
    padding:10,
    width:65
  },
  icon:{
    borderRadius:10,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: 'white'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    marginTop: 65,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
    backgroundColor: 'white'
  }
});

export default TopBar