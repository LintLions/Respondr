const initState = {
  location: null,
  isAssigned: false,
  completed: false,
  chatRoom: '',
<<<<<<< HEAD
  chatMessages: [], // individual msgs live on component's lcoal state 
=======
  region: null,
>>>>>>> dev
};
export default (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_BEACON':
      return { ...state, ...action.options };
    case 'SET_CHAT_ROOM': 
      return { ...state, ...action.chatRoom };
    default:
      return state;
  }
};
