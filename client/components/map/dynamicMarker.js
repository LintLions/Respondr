import React, { Component } from 'react';
import MapView from 'react-native-maps';

class DynamicMarker extends Component {
  constructor(props){
    super(props);
  
  }

 render() {

    return (
      <MapView.Marker
        coordinate={{
      latitude: this.props.marker.currentLocation[0],
      longitude: this.props.marker.currentLocation[1],
    }}
        title={this.props.marker.fullName}
        description={this.props.marker.organization}
        image={require('../../styles/assets/wings.png')}
      />
    );
  }  
}

  export default DynamicMarker;