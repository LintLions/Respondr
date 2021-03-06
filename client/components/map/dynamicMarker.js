import React, { Component } from 'react';
import MapView from 'react-native-maps';

class DynamicMarker extends Component {
  constructor(props){
    super(props);
    this.state = {coordinates:{
      latitude: this.props.marker.currentLocation[0],
      longitude: this.props.marker.currentLocation[1],
    },
    };
  }

 render() {

    return (
      <MapView.Marker
        coordinate={this.state.coordinates}
        title={this.props.marker.fullName}
        description={this.props.marker.organization}
        image={require('../../styles/assets/wings.png')}
      />
    );
  }  
}

  export default DynamicMarker;