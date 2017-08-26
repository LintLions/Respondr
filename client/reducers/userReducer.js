const initState = {
  socket: '',
  device: '',
  OS: '',
  location: null,
  isBeacon: false,
  route: null,
  duration: null,
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
      console.log("update_route duration is, " + action.duration);
      return { ...state, route: action.route, duration: action.duration };
    default:
      return state;
  }
};

module.exports = userReducer;
