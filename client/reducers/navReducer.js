import { Navigator } from '../components/App.js';

const initialState = Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams('Home'));
const secondAction = Navigator.router.getActionForPathAndParams('Signup');


const navReducer = (state = initialState, action) => {
  let nextState;
  // Simply return the original `state` if `nextState` is null or undefined.
  switch (action.type)  {
    case 'Signup':
    nextState = Navigator.router.getStateForAction(
     NavigationAction.navigate({ routeName: 'Signup'}),
     state
     );
  }
  return nextState || state;
};

export default navReducer;