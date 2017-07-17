import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { logIn } from '../../../actions/actions';
import styles from '../../../styles/styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onEmailChange = (event) => {
      this.setState({ email: event.nativeEvent.text });
    };
    this.onPasswordChange = (event) => {
      this.setState({ password: event.nativeEvent.text });
    };
  }

  render() {
    return (
      <View>
        <View style={styles.flowRight}>
          <Icon style={styles.searchIcon} name="mail" size={20} color="#000" />
          <TextInput
            value={this.state.email}
            style={styles.searchInput}
            onChange={this.onEmailChange}
            placeholder="email address"
          />
        </View>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            secureTextEntry
            value={this.state.password}
            onChange={this.onPasswordChange}
            placeholder="password"
          />
          <TouchableHighlight
            style={styles.button}
            underlayColor="#99d9f4"
            onPress={() => this.props.handleIsLoggedIn(this.state)}
          >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({

});


const mapDispatchToProps = dispatch => ({
  handleIsLoggedIn: (state) => {
    dispatch(logIn(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
