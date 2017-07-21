const initState = {
  socket: '',
  location: null,
  isBeacon: false,
  isBeaconAndReceivedHelp: false,
  route: null,
  responders: [],
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_CURRENT_LOCATION':
      return { ...state, location: action.location };
    case 'GET_HELP':
      return { ...state, isBeacon: true };
    case 'CANCEL_HELP':
      return { ...state, isBeacon: false };
    case 'UPDATE_USER':
      return { ...state, ...action.options };
    case 'UPDATE_RESPONDERS':
      return { ...state, responders: [...action.responders] };
    case 'UPDATE_ROUTE':
      return { ...state, route: action.route };
    default:
      return state;
  }
};

module.exports = userReducer;
