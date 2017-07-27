import React, { Component } from 'react';
import MapView from 'react-native-maps';

class StaticMarker extends Component {
constructor(props){
  super(props);
  this.state= {coordinates: {
      latitude: this.props.marker.currentLocation[0],
      longitude: this.props.marker.currentLocation[1],
    },
  } 
}

 render() {
  return (
    <MapView.Marker
      key={this.props.marker.id}
      coordinate={this.state.coordinates}
      title={this.props.marker.fullName}
      description={this.props.marker.organization}
      image={require('../../styles/assets/beacon-static.png')}
    />
  );
  }  
}

  export default StaticMarker;

            