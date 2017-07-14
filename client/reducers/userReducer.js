const userReducer = (state = {
    isBeacon: false,
    isLoggedIn: false,
    location: [],
    email: '',
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
}, action) => {
  switch (action.type) {
    case 'GET_HELP':
      return { ...state, isBeacon:true };
    case 'CANCEL_HELP':
      return { ...state, isBeacon:false };
    case 'LOGIN_SUCCESS':
      return { ...state, email:action.userData.email, fName:action.userData.fName};
    case 'LOGOUT':
      return { ...state, isLoggedIn:false };  
    default:
      return state;
  }
};

module.exports = userReducer;
