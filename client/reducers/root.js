import { combineReducers } from 'redux';
// import all reducer files here
import navReducer from './navReducer.js';
import userReducer from './userReducer.js';

/*

{
  
  user: {
    isBeacon: false,
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
    nav: navReducer,
});

export default rootReducer;