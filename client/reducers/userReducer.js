const userReducer = (state = {
    currentLocation: [],
    isBeacon: false
}, action) => {
  switch (action.type) {
    case 'GET_HELP':
      return { ...state, isBeacon:true };
    case 'CANCEL_HELP':
      return { ...state, isBeacon:false };
    case 'GET_CURRENT_LOCATION':
      return { ...state, currentLocation: [action.userData.latitude, action.userData.longitude]}
    default:
      return state;
  }
};

module.exports = userReducer;
