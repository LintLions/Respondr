 import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  View,
  Animated,
  Easing,
} from 'react-native';
import styles from '../../styles/styles';

class HopeCircle extends Component {
  componentWillMount() {
    this.animatedValue= new Animated.Value(100)
  }

  componentDidMount() {
    this.circle()
  }

  circle(){
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(
        this.animatedValue,
        {
          toValue: 300,
          duration: 3000,
          easing: Easing.easeOut,
        },
      ), 
      Animated.delay(1000),
      Animated.timing(
        this.animatedValue,
        {
          toValue: 600,
          duration: 3000,
          easing: Easing.easeOut,
        },
      ), 
       Animated.delay(1000),
      Animated.timing(
        this.animatedValue,
        {
          toValue: 900,
          duration: 3000,
          easing: Easing.easeOut,
        },
      ), 
      Animated.timing(
        this.animatedValue,
        {
          toValue: 300,
          duration: 3000,
          easing: Easing.easeOut,
        },
      ), 
    ])
    .start();
  }

  render() {
    const animatedStyle={ 
      width: this.animatedValue,
      height: this.animatedValue,
      borderRadius: this.animatedValue,}

    return (
       <MapView.Marker
        coordinate={{
            latitude: this.props.userLocation[0],
            longitude: this.props.userLocation[1],
        }}
      >
        <Animated.View style={styles.markerWrap}>
          <Animated.View
            style={[styles.ring, animatedStyle]}
          />
        </Animated.View>
      </MapView.Marker>
    )
  }
}


  export default HopeCircle;