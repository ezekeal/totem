import React from 'react'
import App from './containers/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import totemApp from './reducers'
// import './styles/styles.less'

let store = createStore(totemApp)
let rootElement = document.getElementById('root')

React.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  rootElement
)
