const helpReducer = (state = {
  User: {
    isBeacon: false,
  },
}, action) => {
  switch (action.type) {
    case 'GET_HELP':
      return { ...state, User: {isBeacon:true} };
    case 'CANCEL_HELP':
      return { ...state, isBeacon: false };
    default:
      return state;
  }
};

module.exports = helpReducer;
