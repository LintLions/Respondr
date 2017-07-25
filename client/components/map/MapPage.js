import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';
import TopBar from './topbar/topBar';
import BottomNav from './bottombar/BottomNav';
import HelpButton from './bottombar/helpButton';
import AngelStatusIcon from './bottombar/AngelStatusIcon';
import styles from '../../styles/styles';
import { animate } from '../../actions/actions';


class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    for (let i = 0; i < nextProps.responders.length; i++) {
      const id = nextProps.responders[i].id;
      if (this.state.markers[id] !== undefined) {
        if (this.state.markers[id].coordinates.latitude._value !== nextProps.responders[i].currentLocation[0] || this.state.markers[id].coordinates.longitude._value !== nextProps.responders[i].currentLocation[1]) {
          console.log("this.state.markers[id].coordinates.latitude._value ", this.state.markers[id].coordinates.latitude._value);
          console.log("nextProps.responders[i].currentLocation[0]", nextProps.responders[i].currentLocation[0]);
          this.state.markers[id].coordinates.timing({
            ...nextProps.responders[i].currentLocation,
            duration: 500,
          }).start();
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          // region={this.props.region}
          style={styles.map}
          showsUserLocation
          followsUserLocation
          showsPointsOfInterest={false}
          showsMyLocationButton
          showsBuildings
        >
          {this.props.responders && this.props.responders.map((marker) => {
            if (marker.mobility === 1) {
              const newMarker = {
                id: marker.id,
                coordinates: new MapView.AnimatedRegion({
                  latitude: marker.currentLocation[0],
                  longitude: marker.currentLocation[1],
                }),
              };
              this.state.markers[marker.id] = newMarker;
              return (
                <MapView.Marker.Animated
                  key={marker.id}
                  coordinate={this.state.markers[marker.id].coordinates}
                  title={marker.fullName}
                  description={marker.organization}
                  image={require('../../styles/assets/wings.png')}
                />
              );
            }
            const coordinates = {
              latitude: marker.currentLocation[0],
              longitude: marker.currentLocation[1],
            };
            return (
              <MapView.Marker
                key={marker.id}
                coordinate={coordinates}
                title={marker.fullName}
                description={marker.organization}
                image={require('../../styles/assets/beacon-static.png')}
              />
            );
          })}

          {this.props.beaconLocation
            ? <MapView.Marker
              coordinate={{
                latitude: this.props.beaconLocation[0],
                longitude: this.props.beaconLocation[1],
              }}
              image={require('../../styles/assets/heart.png')}
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
        <View>
          {!this.props.isLoggedIn &&
          <HelpButton />}
        </View>

        <View style={[styles.column, styles.bottom]}>
          {this.props.beaconLocation &&
            <BottomNav />
          }
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
  isAssigned: state.myBeacon.isAssigned,
  // beaconChatRoom: state.myBeacon.chatRoom,
});

const mapDispatchToProps = dispatch => ({
  animate: (location) => {
    dispatch(animate(location));
  },
});
const MapPageConnected = connect(mapStateToProps, mapDispatchToProps)(MapPage);

export default MapPageConnected;
