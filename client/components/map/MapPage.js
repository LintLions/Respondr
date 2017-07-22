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
import BottomChat from './bottombar/BottomChat';
import HelpButton from './bottombar/helpButton';
import AngelStatusIcon from './bottombar/AngelStatusIcon';
import Chat from './bottombar/Chat';
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
            if (marker.mobility === 1) {      
              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={coordinates}
                  title={marker.fullName}
                  description={marker.organization}
                  image={require('../../styles/assets/wings.png')}
                />
              );
            }
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
        {this.props.isBeacon && 
            <View style={styles.box3}>
              <BottomChat />
            </View>
        }
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
