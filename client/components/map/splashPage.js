import React, { Component } from 'react';
import {
  View,
  Animated,
} from 'react-native';
import logo from '../../styles/assets/med_logo.png';
import icon from '../../styles/assets/appIconMedium.png';
import styles from '../../styles/styles';

class Splash extends Component {
 
  render() {
    return ( 
    <View style={styles.splash}>
      <Animated.Image
        onLoad={this.props.beat()}
        style={{
          transform: [{scale: this.props.scaleValue.interpolate({
            inputRange: [0, .125, .25, .375, .5, .626, .75, .875, 1],
            outputRange: [1, .97, .9, 1.1, .9, 1.1, 1.03, 1.02, 1],
          }),
          },
          ],
        }}
        source={logo}
      />

    <Animated.Image
        style={{
          transform: [{scale: this.props.scaleValue.interpolate({
            inputRange: [0, .125, .25, .375, .5, .626, .75, .875, 1],
            outputRange: [1, .97, .9, 1.1, .9, 1.1, 1.03, 1.02, 1],
          }),
          },
          ],
        }}
        source={icon}
      />
    </View>
    )
  }    
}

export default Splash;
