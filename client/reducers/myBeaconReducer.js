const initState = {
  UID: null, 
  location: null,
  isAssigned: false,
  isCompleted: false,
  chatRoom: null,
  chatMessages: [], // individual msgs live on component's lcoal state 
  region: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_MY_BEACON':
      return { ...state, ...action.options };
    default:
      return state;
  }
};
