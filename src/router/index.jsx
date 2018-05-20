import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from '../components/App'
import Homepage from '../components/homepage/Homepage'
import SortTable from '../components/tables/newSortTableContainer'
import UserTable from '../components/tables/newUserTableContainer'
import SystemStatusTable from '../components/tables/SystemStatusTable'

export default (
  <Router history={ hashHistory }>
    <Route path="/" component={ App }>
      <Route component={ Homepage }>
        <IndexRoute component={ SortTable } />
        <Route path="users" component={ UserTable } />
        <Route path="system-status" component={ SystemStatusTable } />
      </Route>
    </Route>
  </Router>
)
