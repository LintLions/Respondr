const initState = {
  isLoggedIn: false,
  location: null,
  email: '',
  firstName: '',
  lastName: '',
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
  availability: '',
};

const responderReducer = (state = initState, action) => {
  switch (action.type) {
    // case 'GET_HELP':
    //   return { ...state, isBeacon:true };
    // case 'CANCEL_HELP':
    //   return { ...state, isBeacon:false };
    case 'UPDATE_AVAILABIIITY':
      return { ...state,
        availability: action.availability,
      }
    case 'LOGIN_SUCCESS':
      return { ...state,
        ...action.userData,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return initState;
    default:
      return state;
  }
};

module.exports = responderReducer;
