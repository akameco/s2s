// @flow
import * as React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store'
import { getAllProducts } from './containers/CartContainer/logic'

const store = configureStore()
store.dispatch(getAllProducts())

const rootEl = document.getElementById('root')

if (rootEl) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  )
  registerServiceWorker()
}
