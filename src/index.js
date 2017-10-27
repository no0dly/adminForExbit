import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

import router from './router'

import 'reset-css'
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'

import * as store from './store/configureStore'

fetch(process.env.REACT_APP_HTTP_URL,
  {
    credentials: 'include'
  }
).then((res) => {
  ReactDOM.render(
    <Provider store={ store.configure() }>
      {router}
    </Provider>,
    document.getElementById('root')
  )
  registerServiceWorker()
})
