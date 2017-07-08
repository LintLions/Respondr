'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicator,
  ListView,
  Text
} from 'react-native';
import MapView from 'react-native-maps';

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
      <View style={styles.map}>
        <MapView style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
        />
        <BottomBarAngel username={this.props.username} beaconLocation={this.state.beaconLocation}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
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
    ...StyleSheet.absoluteFillObject,
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
