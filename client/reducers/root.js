import { combineReducers } from 'redux';
// import all reducer files here
import navReducer from './navReducer.js';
import userReducer from './userReducer.js';
import responderReducer from './responderReducer.js';
import beaconReducer from './beaconReducer.js';

/* APP STATE

{
  user: {
    currentLocation: [],
    isBeacon: false
  }
  responder: {
    location: 
    email:this.props.navigation.state.params.email || '',
    fName:'',
    lName:'',
    password: '',
    phone: '',
    organization: '',
    privacy: '',
    mobility: '',
    city: '',
    state: '',
    zip: '',
    address: ''  
  },
  nav: some nutso thing
}

*/

const rootReducer = combineReducers({
  // include all reducers here
  user: userReducer,
  responder: responderReducer,
  nav: navReducer,
  myBeacon: beaconReducer,
});

export default rootReducer;