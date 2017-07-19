import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import MapView from 'react-native-maps';
import TopBar from './topbar/topBar';
import BottomNav from './bottombar/BottomNav';
import HelpButton from './bottombar/helpButton';
import AngelStatusIcon from './bottombar/AngelStatusIcon';
import styles from '../../styles/styles';

class MapPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          region={this.props.region}
          style={styles.map}
          showsUserLocation
          followsUserLocation
        >
          {this.props.beaconLocation
            ? <MapView.Marker
              coordinate={{
                latitude: this.props.beaconLocation[0],
                longitude: this.props.beaconLocation[1],
              }}
            />
            : null
          }
          <MapView.Polyline
            coordinates={this.props.coords}
            strokeWidth={4}
            strokeColor="black"
          />
        </MapView>
        <View style={[styles.row]}>
          <TopBar />
          {this.props.isLoggedIn &&
            <AngelStatusIcon
            // switchIsOn={this.state.switchIsOn} handleSwitchIsOn={this.handleSwitchIsOn}
            />
          }
        </View>
        <View
          style={[styles.column, styles.bottom]}
        >
          {this.props.beaconLocation &&
            <BottomNav />
          }
        </View>
        <View style={[styles.bottom]}>
          {!this.props.isLoggedIn &&
          <HelpButton />}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  region: state.myBeacon.region,
  isLoggedIn: state.responder.isLoggedIn,
  userEmail: state.responder.email,
  isBeacon: state.user.isBeacon,
  coords: state.user.route,
  userLocation: state.user.location,
  beaconLocation: state.myBeacon.location,
});

const MapPageConnected = connect(mapStateToProps)(MapPage);

export default MapPageConnected;
