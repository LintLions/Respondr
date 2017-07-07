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

class HelpRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
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
        <View style={styles.container}>
          <Text style={styles.description}>
            I got props and stuff!!
          </Text>          
        </View>
        <View style={styles.notification}>
          <Text style={styles.description}>
            Hi _____, there's a beacon on ______ street, would you be able to assist?
          </Text>
          <View style={styles.flowRight}>
            <TouchableHighlight 
              style={styles.button}
              underlayColor='#99d9f4'
              >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableHighlight>
            <TouchableHighlight 
              style={styles.button}
              underlayColor='#99d9f4'
              >
              <Text style={styles.buttonText}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  notification: {
    flex: 1,
    alignItems: 'stretch',
    // position: 'absolute',
    // height: 100,
    padding: 30,
    bottom: 0,
    backgroundColor: 'rgba(225,225,225,0.8)'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
});

module.exports = HelpRequest;