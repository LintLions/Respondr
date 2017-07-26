import React, { Component } from 'react';
import { TabNavigator, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import PersonalInfoScreen from './PersonalInfo';
import PublicScreen from './Public';
import StaticScreen from './Static';
import { signUp } from '../../actions/actions';

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
  static navigationOptions = () => ({
    title: 'Signup',
  });
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      device: this.props.device,
      OS: this.props.OS,
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
    };

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
    this.signup = () => {
      const userData = this.state;
      console.log('userdata on signup is ', userData);
      this.props.handleSignUp(userData);
      this.props.goHome();
    };
  }

  render() {
    const props = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      phone: this.phone,
      organization: this.organization,
      privacy: this.privacy,
      mobility: this.mobility,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      fullName: this.fullName,
      onfullNameChange: this.onfullNameChange,
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
const mapStatetoProps = state => ({
  nav: state.nav,
  socket: state.user.socket,
  device: state.user.device,
  OS: state.user.OS,
});
const mapDispatchToProps = dispatch => ({
  handleSignUp: (userData) => {
    dispatch(signUp(userData));
  },
  goHome: () => {
    dispatch(NavigationActions.navigate({ routeName: 'Home' }));
  },
});

SignUpPage = connect(mapStatetoProps, mapDispatchToProps)(SignUpPage);
export default SignUpPage;
