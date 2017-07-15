'use strict';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';
import TopBar from './topbar/topBar';
import SignUpPage from '../signup/signUpPage';
import BottomBarAngel from './bottombar/BottomBarAngel';
import HelpButton from './bottombar/helpButton';
import AngelStatusIcon from './bottombar/AngelStatusIcon';
import config from '../config';
import helpers from '../helpers';

const { googleMapsDirectionsApiKey } = require('../config.js');
const APIKEY = googleMapsDirectionsApiKey;

class MapPage extends Component {
  constructor(props) {
    super(props);

}
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
        >
        {this.props.isBeacon &&
          <MapView.Marker
            // coordinate={this.state.beaconCoordinate}
            />}

          <MapView.Polyline 
            // coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor='black'
          />
        </MapView>
        <View style={styles.row}>
          <TopBar />
          {
             this.props.isLoggedIn && 
            <AngelStatusIcon 
            // switchIsOn={this.state.switchIsOn} handleSwitchIsOn={this.handleSwitchIsOn}
            />
          }
        </View>
        <View>
          <HelpButton/>
        

        </View>
        {
          this.props.isLoggedIn &&
          <View style={styles.bottomBar}>

            <BottomBarAngel style={styles.bottomBar}/>

          </View>
        }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    flex: 1
    // backgroundColor: 'white',
    // marginTop: 65,
    // alignItems: 'center',
    // justifyContent: 'space-around'
  },
   map: {
    ...StyleSheet.absoluteFillObject,
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
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
    color: '#48BBEC'
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: 375,
    // height: 222,
    // backgroundColor: 'rgba(0,0,0,0.5)'
    // justifyContent: 'flex-end'
    // flex: 1,
    // position: 'absolute',
    // bottom: 0
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  userEmail: state.user.email,
  isBeacon: state.user.isBeacon,
})

MapPage = connect(mapStateToProps)(MapPage)
module.exports = MapPage;



