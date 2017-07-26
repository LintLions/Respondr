import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Animated,
  Image,
  Easing,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MapView from 'react-native-maps';
import TopBar from './topbar/topBar';
import BottomNav from './bottombar/BottomNav';
import HelpButton from './bottombar/helpButton';
import AngelStatusIcon from './bottombar/AngelStatusIcon';
import styles from '../../styles/styles';
import { animate } from '../../actions/actions';
import heart from '../../styles/assets/heart.png'


class MapPage extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3);
    this.state = {
      markers: {},
    };
  }
  
  componentWillReceiveProps(nextProps) {
    //animate dynamicResponders
    for (let i = 0; i < nextProps.responders.length; i++) {
      const id = nextProps.responders[i].id;
      if (this.state.markers[id] !== undefined) {
        if (this.state.markers[id].coordinates.latitude._value !== nextProps.responders[i].currentLocation[0] || this.state.markers[id].coordinates.longitude._value !== nextProps.responders[i].currentLocation[1]) {
          this.state.markers[id].coordinates.timing({
            ...nextProps.responders[i].currentLocation,
            duration: 500,
          }).start();
        }
      }
    }
    //animate beacon marker
  }
  spring() {
    //sproing effect on heart icon
    this.springValue.setValue(0.3);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
        tension: 1,
      },
    ).start(() => this.spring());

    //
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <MapView
          // region={this.props.region}
          style={styles.map}
          showsUserLocation={true}
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
                }}>
                <Animated.View style={styles.markerWrap}> 
                  <Animated.View style={styles.ring} />
                    <Animated.Image
                      onLoad={this.spring.bind(this)}
                      style={{ transform: [{scale: this.springValue}] }}
                      source={heart}
                    />  
                </Animated.View>
              </MapView.Marker>
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
            <View>  
            <AngelStatusIcon
              // switchIsOn={this.state.switchIsOn} handleSwitchIsOn={this.handleSwitchIsOn}
            />
            <Button
              title="My Profile"
              onPress={() =>
                navigate('Profile')
              }
            />
            </View>
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
