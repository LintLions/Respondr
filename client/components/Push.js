import PushNotification from 'react-native-push-notification';
import { AsyncStorage } from 'react-native';
import { store } from '../index';
import { socket } from './helpers';
import { updateUser } from '../actions/actions';

PushNotification.configure({

  // (optional) Called when Token is generated (iOS and Android)
  onRegister: (tokenInfo) => {
    console.log('TOKEN:', tokenInfo);
    store.dispatch(updateUser({
      device: tokenInfo.token,
      OS: tokenInfo.os,
    }));
    AsyncStorage.getItem('id_token', (err, value) => {
      if (err) {
        console.error('error getting session from phone storage ', err);
      }
      socket.emit('updateUser', {
        query: {
          token: value,
        },
        update: {
          device: tokenInfo.token,
          OS: tokenInfo.os,
        },
      });
    });
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: (notification) => {
    console.log('NOTIFICATION:', notification);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: false,

  /**
    * (optional) default: true
    * - Specified if permissions (ios) and token (android and ios) will requested or not,
    * - if not, you must call PushNotificationsHandler.requestPermissions() later
    */
  requestPermissions: false,
});

export default PushNotification;
