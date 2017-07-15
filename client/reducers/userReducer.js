const initState = {
  isBeacon: false,
  isLoggedIn: false,
  location: [],
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
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_HELP':
      return { ...state, isBeacon: true };
    case 'CANCEL_HELP':
      return { ...state, isBeacon: false };
    case 'LOGIN_SUCCESS':
      return { ...state,
        ...action.userData,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return { ...initState };
    default:
      return state;
  }
};

module.exports = userReducer;
