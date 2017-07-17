const initState = {
  socket: '',
  location: null,
  isBeacon: false,
  route: null,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_LOCATION':
      return { ...state, location: action.location };
    case 'GET_HELP':
      return { ...state, isBeacon: true };
    case 'CANCEL_HELP':
      return { ...state, isBeacon: false };
    default:
      return state;
  }
};

module.exports = userReducer;
