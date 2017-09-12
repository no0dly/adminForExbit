import * as redux from 'redux'

import {
  loginPopupReducer,
  userReducer,
  ordersReducer,
  confirmPopupReducer
} from '../reducers'

export const configure = (initialState = {}) => {
  const reducer = redux.combineReducers({
    loginPopup: loginPopupReducer,
    confirmPopup: confirmPopupReducer,
    user: userReducer,
    orders: ordersReducer
  })

  const store = redux.createStore(reducer, initialState, redux.compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))

  return store
}
