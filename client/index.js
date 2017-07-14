import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { App } from './components/App'
import MapPage from '/components/MapPage'
import { connect } from 'react-redux';
import rootReducer from './reducers/root'
import devToolsEnhancer from 'remote-redux-devtools'

const store = createStore(
  rootReducer
);
// App = connect()(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.container'));
)


export default store