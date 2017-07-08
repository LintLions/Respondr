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
import TopBar from './topBar';

import BottomBarAngel from './BottomBarAngel';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beaconLocation: ''
    };
    this.onLocationPressed = () => {
    navigator.geolocation.getCurrentPosition(
    location => {
      var search = location.coords.latitude + ',' + location.coords.longitude;
      this.setState({ searchString: search });
      var query = urlForQueryAndPage('centre_point', search, 1);
      this._executeQuery(query);
    },
    error => {
      this.setState({
        message: 'There was a problem with obtaining your location: ' + error
      });
    });
}
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
        />
        
        <View style={styles.bottomBar}>
          <BottomBarAngel style={styles.bottomBar} username={this.props.username} beaconLocation={this.state.beaconLocation}/>
        </View>
        
      <TopBar />  
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // marginTop: 65,
    // alignItems: 'center',
    // justifyContent: 'space-around'
  },
  box1: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#999999',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  box2: {
    flex: 2
  },
  map: {
    // flex: 2,
    // ...StyleSheet.absoluteFillObject
    // below is equivalent to absoluteFillObject
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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
  prompt: {
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
    color: '#656565',
    marginBottom: 20
  },
  buttonDirection: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    height: 36,
    margin: 10,

    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  }
});

module.exports = MapPage;

// <BottomBarAngel style={styles.bottomBar} username={this.props.username} beaconLocation={this.state.beaconLocation}/>
// <TouchableHighlight style={styles.button}><Text>Hello World</Text></TouchableHighlight>