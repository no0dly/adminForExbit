import React from 'react'
import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from 'react-router'

import App from '../components/App'
import Homepage from '../components/homepage/Homepage'

export default (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Homepage } />
    </Route>
  </Router>
)
