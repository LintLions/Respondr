const initState = {
  location: [],
  isAssigned: false,
  completed: false,
  chatRoom: '',
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_BEACON':
      return { ...state, ...action };
    default:
      return state;
  }
};

export default userReducer;
