const initState = {
  name: null,
  location: null,
  chatRoom: null,
  chatMessages: [],
};
export default (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_MY_RESPONDER':
      return { ...state, ...action.options };
    default:
      return state;
  }
};
