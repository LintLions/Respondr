import { combineReducers } from 'redux';
// import all reducer files here
import helpReducer from './helpReducer.js';

const rootReducer = combineReducers({
    // include all reducers here
    helpReducer
});

export default rootReducer;