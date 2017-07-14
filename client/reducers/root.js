import { combineReducers } from 'redux';
// import all reducer files here
import helpReducer from './helpReducer.js';
import navReducer from './navReducer.js';

const rootReducer = combineReducers({
    // include all reducers here
    help: helpReducer,
    nav: navReducer,
});

export default rootReducer;