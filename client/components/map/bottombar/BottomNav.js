import React, { Component } from 'react';
import { TabNavigator, NavigationActions } from 'react-navigation';
import {
  AlertIOS,
} from 'react-native';
import { connect } from 'react-redux';
import BottomBarAngel from './BottomBarAngel';
import BottomChat from './BottomChat';
import config from '../../config';
import { signUp } from '../../../actions/actions'

const navScreens = {
  Main: { screen: BottomBarAngel },
  Chat: { screen: BottomChat },
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
const Navigator = TabNavigator(navScreens, navOptions);

class BottomNav extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Signup`,
  });
  constructor(props) {
    super(props);
  }

  render() {
    return <Navigator />;
  }

}
const mapStatetoProps = (state) => ({
  nav: state.nav,
  socket: state.user.socket,
});
const mapDispatchToProps = (dispatch) => ({
  goHome: () => {
    dispatch(NavigationActions.navigate({ routeName: 'Home' }));
  },
});

export default connect(mapStatetoProps, mapDispatchToProps)(BottomNav);
