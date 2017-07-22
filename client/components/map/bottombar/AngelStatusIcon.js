import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Switch,
} from 'react-native';
import { switchAvailability } from '../../../actions/actions';
import styles from '../../../styles/styles';

class AngelStatusIcon extends React.Component {

  render() {
    return (
      <View style={styles.toggleIcon}>
        <Text>Online</Text>
        <Switch
          onValueChange={() => {
            this.props.switchAvailability(!this.props.available, this.props.id)}
          } 
          onTintColor='#ea8078'
          value={this.props.available} 
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  available: state.responder.available,
  id: state.responder.id,
});
const mapDispatchToProps = dispatch => ({
  switchAvailability: (available, id) => {
    console.log("available is ", available);
    dispatch(switchAvailability(available, id));
  },
});

const AngelStatusIconConnected = connect(mapStateToProps, mapDispatchToProps)(AngelStatusIcon);

module.exports = AngelStatusIconConnected;
