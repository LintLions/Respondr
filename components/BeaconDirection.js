'use strict';

import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import MapView from 'react-native-maps';

const { googleMapsDirectionsApiKey } = require('./config.js');
const APIKEY = googleMapsDirectionsApiKey;

const decode = (t,e) => { // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
  for(var n,o,u=0,l=0,r=0,d=[],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){
    a=null,h=0,i=0;
    do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;
    do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}
    return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
}

class BeaconDirection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }
    
    console.log('this.state.coords:', this.state.coords);
  }

  componentWillMount() {
    const mode = 'walking'; 
    const origin = '40.757917,-73.992215'; // this.props.angelLocation
    const destination = '40.750487,-73.976401'; // this.props.beaconLocation
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.routes.length) {
          this.setState({
            coords: decode(responseJson.routes[0].overview_polyline.points)
          });
        }
      }).catch(e => {console.warn(e)});
    
    console.log('url: ', url)
  }

  render() {
    console.log('this.state.coords:', this.state.coords);
    
    return(
      <View style={styles.container}>
        <MapView
            style={styles.map}
            // showsUserLocation={true}
            // followsUserLocation={true}
            initialRegion={{
            latitude:40.757917, // angelLocation lat
            longitude:-73.992215, // angelLocation lon
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={4}
            strokeColor='black'
          />
        </MapView>
      </View>
    )
  }

}

var styles = StyleSheet.create

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
      ...StyleSheet.absoluteFillObject,
  }
})

module.exports = BeaconDirection;