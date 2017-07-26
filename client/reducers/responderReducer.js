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
  intervalID: '',
  available: '',
};

const responderReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_RESPONDER': 
      return { ...state, ...action.options}
    case 'CHANGE_AVAILABILITY':
      return { ...state,
        available: action.available,
      }
    case 'LOGIN_SUCCESS':
      return { ...state,
        ...action.userData,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return initState;
    case 'UPDATE_INTERVALID':
      return { ...state, intervalID: action.intervalID };
    default:
      return state;
  }
};

module.exports = responderReducer;
