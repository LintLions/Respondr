import React, { Component } from 'react';
import { Modal,
  Text,
  SegmentedControlIOS,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  AlertIOS,
  AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import Login from './login';
import Signup from './signup';
import styles from '../../../styles/styles';
import { logOut } from '../../../actions/actions';


class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false, // is the modal visible?
      buttonVisible: true, // is the buttion for calling the modal visible?
      selectedIndex: 0,
    };
    this.setModalVisible = (visible) => { //hide modal and button
      this.setState({modalVisible: visible, buttonVisible: !visible});
    };

    this.logout = async () => {
      try {
        this.props.logout();
        await AsyncStorage.removeItem('id_token');
        AlertIOS.alert("Logout Success!")
        this.props.logout();
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
                      onPress={this.logout}
                    >
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
                        this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
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

        {this.state.buttonVisible && <View style={[styles.iconContainer, styles.row]}>
          
         
          <TouchableHighlight 
            onPress={() => {this.setModalVisible(true)
          }}>
            <Icon name="feather" size={40} color="#4F8EF7" style={styles.icon} />
          </TouchableHighlight>
          <View style={[styles.column]}>
          {!this.props.isLoggedIn &&  <Text>Login</Text>}
          {!this.props.isLoggedIn &&  <Text>Signup</Text>}
          </View>
        </View> }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.responder.firstName,
  beaconLocation: state.myBeacon.location,
  isLoggedIn: state.responder.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logOut());
  },
});

const TopBarConnected = connect(mapStateToProps, mapDispatchToProps)(TopBar);

export default TopBarConnected;
