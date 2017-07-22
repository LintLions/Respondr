import { combineReducers } from 'redux';
import navReducer from './navReducer.js';
import userReducer from './userReducer.js';
import responderReducer from './responderReducer.js';
import myBeaconReducer from './myBeaconReducer.js';
import myResponderReducer from './myResponderReducer.js';

/* APP STATE

{
  user: {
    currentLocation: [],
    isBeacon: false
  }
  responder: {
    isLoggedIn: false,
    location: null,
    email: '',
    fName: '',
    lName: '',
    password: '',
    phone: '',
    organization: '',
    privacy: '',
    mobility: '',
    city: '',
    state: '',
    zip: '',
    address: '',
    socket: '', 
  },
  nav: {
    some nutso thing
  },
  myBeacon: {
    location: null,
    isAssigned: false,
    completed: false,
    chatRoom: '',
    chatMessages: []
  },
  myResponder: {
    
  }
}

*/

const rootReducer = combineReducers({
  nav: navReducer,
  user: userReducer,
  responder: responderReducer,
  myBeacon: myBeaconReducer,
  myResponder: myResponderReducer,
});

export default rootReducer;