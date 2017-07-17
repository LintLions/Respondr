import React, { Component } from 'react';
import { TabNavigator, NavigationActions } from 'react-navigation';
import {
  AlertIOS,
} from 'react-native';
import { connect } from 'react-redux';
import PersonalInfoScreen from './PersonalInfo';
import PublicScreen from './Public';
import StaticScreen from './Static';
import config from '../config';
import { signUp } from '../../actions/actions'

const navScreens = {
  Personal: { screen: PersonalInfoScreen },
  Privacy: { screen: PublicScreen },
  Location: { screen: StaticScreen },
};
const navOptions = {
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 18,
    },
    style: {
      backgroundColor: 'gainsboro',
    },
  },
};
const SignUpNavigator = TabNavigator(navScreens, navOptions);

class SignUpPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Signup`,
  });
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.screenProps.socket.id,
      email: this.props.navigation.state.params.email || '',
      fName: '',
      lName: '',
      password: '',
      phone: '',
      organization: '',
      privacy: '',
      mobility: '',
      city: '',
      state: '',
      zip: '',
      address: '',
    };

    this.onEmailChange = (e) => {
      let email = e.nativeEvent.text
      this.setState({email:email});
    }
    this.onFNameChange = (e) => {
      console.log(e.nativeEvent)
      let fName = e.nativeEvent.text
      this.setState( {fName:fName} );
    }
    this.onLNameChange = (e) => {
      let lName = e.nativeEvent.text
      this.setState( {lName:lName} );
    }
    this.onPasswordChange = (e) => {
      let password = e.nativeEvent.text
      this.setState( {password: password});
    }
    this.onPhoneChange = (e) => {
      let phone = e.nativeEvent.text
      this.setState( {phone:phone} );
    }
    this.onOrganizationChange = (e) => {
      let organization = e.nativeEvent.text
      this.setState({organization:organization});
    }
    this.onPrivacyChange = (e) => {
      let privacy = e.nativeEvent.selectedSegmentIndex
      console.log("privacy is ", privacy);
      this.setState({privacy:privacy});
    }
    this.onMobilityChange = (e) => {
      let mobility = e.nativeEvent.selectedSegmentIndex
      console.log("mobility is ", mobility);
      this.setState({mobility:mobility} )
    }

    this.signup = () => {
      var userData = JSON.stringify(this.state);
      this.props.handleSignUp(userData);
      this.props.goHome();
    };
  }

  render() {
    const props = {
      email: this.email,
      fName: this.fName,
      lName: this.lName,
      password: this.password,
      phone: this.phone,
      organization: this.organization,
      privacy: this.privacy,
      mobility: this.mobility,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      onEmailChange: this.onEmailChange,
      onFNameChange: this.onFNameChange,
      onLNameChange: this.onLNameChange,
      onPasswordChange: this.onPasswordChange,
      onPhoneChange: this.onPhoneChange,
      onOrganizationChange: this.onOrganizationChange,
      onPrivacyChange: this.onPrivacyChange,
      onMobilityChange: this.onMobilityChange,
      onAddressChange: this.onAddressChange,
      onCityChange: this.onCityChange,
      onStateChange: this.onStateChange,
      onZipChange: this.onZipChange,
      signup: this.signup,
    };
    return <SignUpNavigator screenProps={props} />;
  }

}
const mapStatetoProps = (state) => ({
  nav: state.nav,
  socket: state.user.socket,
});
const mapDispatchToProps = (dispatch) => ({
  handleSignUp: (userData) => {
    dispatch(signUp(userData));
  },
  goHome: () => {
    dispatch(NavigationActions.navigate({ routeName: 'Home' }))
  }
});

SignUpPage = connect(mapStatetoProps, mapDispatchToProps)(SignUpPage)
export default SignUpPage;
