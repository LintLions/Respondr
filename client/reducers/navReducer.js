import { Navigator } from '../components/App.js';


// const firstAction = Navigator.router.getActionForPathAndParams('Home');
// const secondAction = Navigator.router.getActionForPathAndParams('Signup');
// const initialNavState = Navigator.router.getStateForAction(
//   firstAction,
//   secondAction
// );
const firstAction = Navigator.router.getActionForPathAndParams('Home');
const initialState = Navigator.router.getStateForAction(firstAction);

const navReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'Home':
    newState =  Navigator.router.getStateForAction(
      NavigationActions.navigate({ routeName: 'Home' }),
      state
    )
    break;
   case 'BACK':
    newState = Navigator.router.getStateForAction(NavigationActions.back(), state)
  default: 
    newState = Navigator.router.getStateForAction(action, state);
    break;
  };
  
  return newState || state;
};

export default navReducer;
