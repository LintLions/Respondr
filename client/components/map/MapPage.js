'use strict';

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
    this.state = {
      coordinate: null,
      coords: [],
      switchIsOn: false, 
      beaconCoordinate: null,
      helpButtonVisible: true
    };

    this.getHelp = () => {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      function success(pos) {
        var crd = pos.coords;
        this.setState({
          beaconCoordinate:{
            latitude: crd.latitude,
            longitude: crd.longitude
          },
          helpButtonVisible: false,
        }, function saveBeacon() { 
            fetch(`${config.url}/beacons`, {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.beaconCoordinate)
            })
            .then((response) => response.json())
          }
        )        
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success.bind(this), error, options)
    }

    this.cancelHelp = () => {
      let oldBeaconCoordinate = this.state.beaconCoordinate;
       this.setState({
        helpButtonVisible: true,
        beaconCoordinate: null,
      }, function cancelBeacon() { 
            fetch(`${config.url}/beacons`, {
              method: "PUT",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(oldBeaconCoordinate)
            })
            .then((response) => response.json())
          })
    } 

    this.drawRoute = (dest) => { // dest needs to be a string of coordinates (without space)
      const mode = 'walking'; 
      const origin = `${this.state.coordinate.latitude},${this.state.coordinate.longitude}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${APIKEY}&mode=${mode}`;

      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.routes.length) {
            this.setState({
              coords: helpers.decode(responseJson.routes[0].overview_polyline.points)
            });
          }
        }).catch(e => {console.warn(e)});
      
      console.log('url: ', url)
    }

    this.handleSwitchIsOn = (e) => {
      this.setState({
        switchIsOn: !this.state.switchIsOn
      })
    }
  }

  componentWillMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function success(pos) {
      var crd = pos.coords;
      this.setState({
        coordinate:{
          latitude: crd.latitude,
          longitude: crd.longitude
        }
      })        
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success.bind(this), error, options)
  }

  componentDidMount(){
    this.props.screenProps.methods.getUserWithToken()
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <MapView.Marker
            coordinate={this.state.beaconCoordinate}/>
          <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor='black'
          />
        </MapView>
        <View style={styles.row}>
          <TopBar
            screenProps={this.props.screenProps}
            location={this.props.location}
            navigation={this.props.navigation}
            handleIsLoggedIn={this.props.screenProps.methods.handleIsLoggedIn}
          />
          {this.props.screenProps.isLoggedIn && 
            <AngelStatusIcon switchIsOn={this.state.switchIsOn} handleSwitchIsOn={this.handleSwitchIsOn} />
          }
        </View>
        <View>
          <HelpButton
            helpButtonVisible={this.state.helpButtonVisible}
            getHelp={this.getHelp.bind(this)}
            cancelHelp={this.cancelHelp.bind(this)}
          >
          </HelpButton>
        </View>
        {this.props.screenProps.isLoggedIn &&
          <View style={styles.bottomBar}>
            <BottomBarAngel
              style={styles.bottomBar}
              username={this.props.screenProps.user.username}
              beaconLocation={this.state.beaconLocation}
              beaconExists={this.props.screenProps.beaconExists}
              switchIsOn={this.state.switchIsOn}
              handleSwitchIsOn={this.handleSwitchIsOn}/>
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
    bottom: 40,
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

module.exports = MapPage;
