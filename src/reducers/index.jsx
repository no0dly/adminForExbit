export const loginPopupReducer = (state = { showed: false }, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_POPUP':
      return {
        showed: true,
        mode: action.mode
      }
    case 'CLOSE_LOGIN_POPUP':
      return {
        showed: false,
        mode: undefined
      }
    case 'CHANGE_LOGIN_POPUP_MODE':
      return {
        ...state,
        mode: action.newMode,
        error: undefined
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: undefined
      }
    default:
      return state
  }
}

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {
        username: action.user.username,
        balance: action.user.balance
      }
    case 'CLEAR_USER':
      return {}
    default:
      return state
  }
}

export const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case 'ORDERS_INIT':
      return action.orders
    case 'ORDERS_ADD':
      return [ action.order, ...state ]
    case 'ORDERS_UPDATE':
      return state.map((order) => {
        if (order.order_id === action.id) {
          order.amount = action.amount
        }
        return order
      })
    case 'ORDERS_REMOVE':
      return state.filter(order => order.order_id !== action.id)
    case 'CLEAR_USER':
      return []
    default:
      return state
  }
}

export const confirmPopupReducer = (state = { showed: false }, action) => {
  switch (action.type) {
    case 'OPEN_CONFIRM_POPUP':
      return {
        showed: true,
        orderId: action.orderId
      }
    case 'CLOSE_CONFIRM_POPUP':
      return {
        showed: false,
        orderId: undefined
      }
    default:
      return state
  }
}
