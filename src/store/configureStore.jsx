import * as redux from 'redux'

import {
  loginPopupReducer,
  userReducer,
  ordersReducer,
  confirmPopupReducer,
  usersListReducer,
  userGroupsListReducer
} from '../reducers'

export const configure = (initialState = {}) => {
  const reducer = redux.combineReducers({
    loginPopup: loginPopupReducer,
    confirmPopup: confirmPopupReducer,
    user: userReducer,
    orders: ordersReducer,
    usersList: usersListReducer,
    userGroupsList: userGroupsListReducer
  })

  const store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store
}
