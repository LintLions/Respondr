const initState = {
  location: null,
  isAssigned: false,
  isCompleted: false,
  chatRoom: '',
  chatMessages: [], // individual msgs live on component's lcoal state 
  region: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_BEACON':
      return { ...state, ...action.options };
    case 'SET_CHAT_ROOM': 
      return { ...state, chatRoom: action.chatRoom };
    default:
      return state;
  }
};
