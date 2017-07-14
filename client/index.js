import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import { connect } from 'react-redux';
import rootReducer from './reducers/root'
import devToolsEnhancer from 'remote-redux-devtools'
import thunk from 'redux-thunk';



const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
// App = connect()(App);
class Index extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
       <Provider store={store}>
        <App />
      </Provider> 
    )
  }
}

export default Index