import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import styles from '../../../styles/styles';
import wings from '../../../styles/assets/wings.png';
import heart from '../../../styles/assets/heart.png';


class Signup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.signUp}>
        <View style={styles.flowRight}>
          <Image source={wings} />
          <Text>---------------------</Text>
          <Image source={heart} />
        </View>
        <View style={styles.flowRight}>
          <Button
            title='Get Started, Sign Up'
            onPress={() => {
              this.props.setModalVisible(false);
              this.props.signupScreen()
            }}
            style={styles.button}
          >
            <Text style={styles.header}>Get Started, Sign Up</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStatetoProps = (state) => ({
  nav: state.nav
})
const mapDispatchToProps = (dispatch) => ({
  signupScreen: () => {
    dispatch(NavigationActions.navigate({ routeName: 'Signup' }))
  }
});

Signup = connect(mapStatetoProps, mapDispatchToProps)(Signup)
export default Signup