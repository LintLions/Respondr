import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';
import TopBar from './topbar/topBar';
import BottomBarAngel from './bottombar/BottomBarAngel';
import HelpButton from './bottombar/helpButton';
import AngelStatusIcon from './bottombar/AngelStatusIcon';
import styles from '../../styles/styles';
import { animate } from '../../actions/actions';


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
          showsPointsOfInterest={false}
          showsMyLocationButton
          showsBuildings
        >
        
          {this.props.responders && this.props.responders.map((marker) => {
            const coordinates = {
              latitude: marker.currentLocation[0],
              longitude: marker.currentLocation[1],
            };

            return (
              <MapView.Marker
                coordinate={coordinates}
                title={marker.fullName}
                description={marker.organization}
                image={require('../../styles/assets/wings.png')}
              />
            );
          })}

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
          <TouchableOpacity
            onPress={() => this.props.animate(this.props.userLocation)}
            style={[styles.bubble, styles.button]}
          >
            <Text>Animate</Text>
          </TouchableOpacity>
          {this.props.isLoggedIn &&
            <AngelStatusIcon
              // switchIsOn={this.state.switchIsOn} handleSwitchIsOn={this.handleSwitchIsOn}
            />
          }
        </View>
        <View style={[styles.column, styles.bottom]}>
          {this.props.beaconLocation &&
            <BottomBarAngel />
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
  responders: state.user.responders,
});
const mapDispatchToProps = dispatch => ({
  animate: (location) => {
    dispatch(animate(location)); //setTimeout && animate w/ component will receive props?
  },
});
const MapPageConnected = connect(mapStateToProps, mapDispatchToProps)(MapPage);

export default MapPageConnected;
