import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Button,
} from 'react-native';
import MapView from 'react-native-maps';
import TopBar from './topbar/topBar';
import BottomNav from './bottombar/BottomNav';
import HelpButton from './bottombar/helpButton';
import AngelStatusIcon from './bottombar/AngelStatusIcon';
import styles from '../../styles/styles';
import heart from '../../styles/assets/heart.png';
import Splash from './splashPage';
import DynamicMarker from './dynamicMarker';
import StaticMarker from './staticMarker';

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.scaleValue = new Animated.Value(0); //used in heartbeat animation on beacon
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
      },
    };
    this.mapRef = null;
    this.onRegionChange = (region) => {
      this.setState({ region });
    }
  }

  componentWillReceiveProps(nextProps) {
    //set region to user's location on load
    console.log('+MapPage - nextProps: ', nextProps);
    if (this.state.region.latitude === null && nextProps.userLocation[0]) {
      this.setRegion(nextProps.userLocation[0], nextProps.userLocation[1], 0.01051737,  0.01051737);
    }
    //snaps to responder location
    if (this.props.responderLocation && this.props.responderLocation[0]) {
      this.mapRef.fitToCoordinates(
      [{ latitude: this.props.userLocation[0], longitude: this.props.userLocation[1] },
      { latitude: this.props.responderLocation[0], longitude: this.props.responderLocation[1] }],
      { edgePadding:
        { top: 50, right: 50, bottom: 50, left: 50 },
          animated: false,
      });
    }
    //snap to beacon location
    if (this.props.beaconLocation) {
       this.mapRef.fitToCoordinates(
          [{ latitude: this.props.userLocation[0], longitude: this.props.userLocation[1] },
          { latitude: this.props.beaconLocation[0], longitude: this.props.beaconLocation[1] }],
          { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true })}
  } //end constructor

  setRegion(lat, lng, latdelta, lngdelta) {
    this.setState({ region: {
      latitude: lat,
      longitude: lng,
      latitudeDelta: latdelta,
      longitudeDelta: lngdelta,
      },
    });
  }

  //heartbeat effect on heart icon
  beat() {
    this.scaleValue.setValue(0);
    Animated.timing(
      this.scaleValue,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.easeInOutBack,
      },
    ).start(() => this.beat());
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
    <View style={styles.container}>
      { !this.props.userLocation ?

        <Splash beat={this.beat} scaleValue={this.scaleValue} />

       :
      <View style={styles.container}>   
        <MapView
          ref={(ref) => { this.mapRef = ref }}
          region={this.state.region}
          style={styles.map}
          showsUserLocation
          showsPointsOfInterest={false}
          showsMyLocationButton
          onRegionChange={this.onRegionChange}
        >
        {this.props.responders && this.props.responders.map((marker) => {
          if (marker.mobility === 1) {
            return(
              <DynamicMarker key={marker.fullName} marker={marker}/>
            )
          } return(
              <StaticMarker key={marker.id} marker={marker}/>
            )
        })}
        {
          this.props.isBeacon ? //if this person is a beacon render beacon marker
            <MapView.Marker
              coordinate={{
                  latitude: this.props.userLocation[0],
                  longitude: this.props.userLocation[1],
              }}
            >
              <Animated.View style={styles.markerWrap}>
                 <Animated.View style={styles.ring}/>
              </Animated.View>
            </MapView.Marker>
            : null  
        }
        {this.props.beaconLocation ? //if this person has accepted a beacon render beacon
          <MapView.Marker
              coordinate={{
                latitude: this.props.beaconLocation[0],
                longitude: this.props.beaconLocation[1],
              }}
          >
            <Animated.View style={styles.markerWrap}>
                <Animated.Image
                  onLoad={this.beat.bind(this)}
                  style={{
                    transform: [{scale: this.scaleValue.interpolate({
                      inputRange: [0, .125, .25, .375, .5, .626, .75, .875, 1],
                      outputRange: [1, .97, .9, 1.1, .9, 1.1, 1.03, 1.02, 1],
                    }),
                    },
                    ],
                  }}
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
      <View style={[styles.bottom]}>
        {!this.props.isLoggedIn &&
        <HelpButton />}
      </View>

      <View style={[styles.column, styles.bottom]}>
        {this.props.beaconLocation &&
          <BottomNav />
        }
      </View> 
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
  isAssigned: state.myBeacon.isAssigned,
  responderLocation: state.myResponder.location,
  // beaconChatRoom: state.myBeacon.chatRoom,
  UID: state.myBeacon.UID,
});

const MapPageConnected = connect(mapStateToProps)(MapPage);

export default MapPageConnected;
