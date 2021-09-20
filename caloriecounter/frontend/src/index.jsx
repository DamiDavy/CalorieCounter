import React from 'react'
import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import store from './store'
import { App } from './components/App'

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px'
}

const Root = () => (
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </Provider>
)

render(<Root />, document.getElementById('root'))