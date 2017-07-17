const initState = {
  location: null,
  isAssigned: false,
  completed: false,
  chatRoom: '',
  region: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_BEACON':
      return { ...state, ...action.options };
    default:
      return state;
  }
};

