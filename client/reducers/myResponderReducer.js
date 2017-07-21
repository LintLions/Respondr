const initState = {
  name: null,
  location: null,
  chatRoom: '',
  chatMessages: [],
};
export default (state = initState, action) => {
  switch (action.type) {
    // case 'UPDATE_RESPONDER':
    //   return { ...state, ...action.options };
    // case 'SET_CHAT_ROOM': 
    //   return { ...state, chatRoom: action.chatRoom };
    default:
      return state;
  }
};
