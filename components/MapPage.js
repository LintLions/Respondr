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
import SignUpPage from './signup/signUpPage';
import BottomBarAngel from './BottomBarAngel';
import HelpButton from './helpButton';
import config from './config.js';
import helpers from './helpers';

const { googleMapsDirectionsApiKey } = require('./config.js');
const APIKEY = googleMapsDirectionsApiKey;

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: null,
      coords: []
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
          coordinate:{
            latitude: crd.latitude,
            longitude: crd.longitude
          }
        }, function saveBeacon() { 
            fetch(`${config.url}/beacons`, {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.coordinate)
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

  render() {
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          <MapView.Marker
            coordinate={this.state.coordinate}/>
          <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor='black'
          />
        </MapView>
        <TopBar
          screenProps={this.props.screenProps}
          location={this.props.location}
          navigation={this.props.navigation}
        />
        <View>
          <HelpButton
            getHelp={this.getHelp.bind(this)}
          >
          </HelpButton>
        </View>
        <View style={styles.bottomBar}>
          <BottomBarAngel
            style={styles.bottomBar}
            username={this.props.screenProps.user.username}
            beaconLocation={this.state.beaconLocation}/>
        </View>
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
    backgroundColor: 'white',
    marginTop: 65,
    alignItems: 'center',
    justifyContent: 'space-around'
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
});

module.exports = MapPage;
