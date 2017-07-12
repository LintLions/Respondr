const helpReducer = (state=null, action) => {
  switch(action.type) {
    case "":
      return action.payload.data;
    case "":
      return action.payload.data;
    default:
      return state;
  }
}

module.exports = helpReducer;