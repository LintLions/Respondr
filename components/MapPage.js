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


class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: null
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
        })        
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };

      navigator.geolocation.getCurrentPosition(success.bind(this), error, options)
    } 
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
