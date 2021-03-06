export const loginPopupReducer = (state = { showed: false }, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_POPUP':
      return {
        showed: true
      }
    case 'CLOSE_LOGIN_POPUP':
      return {
        showed: false
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
      return [action.order, ...state]
    case 'ORDERS_UPDATE':
      return state.map(order => {
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
        orderId: action.payload.orderId,
        currencyPair: action.payload.currencyPair
      }
    case 'CLOSE_CONFIRM_POPUP':
      return {
        showed: false,
        orderId: undefined,
        currencyPair: undefined
      }
    default:
      return state
  }
}

export const usersListReducer = (state = [], action) => {
  switch (action.type) {
    case 'USERS_LIST_INIT':
      return action.users
    case 'USERS_LIST_ADD':
      return [action.user, ...state]
    case 'USERS_LIST_UPDATE':
      return state.map(user => {
        if (user.user_id === action.user.user_id) {
          for (let value in user.balance) {
            user.balance[value] = action.user.balance[value]
          }
          user.group = action.user.group
        }
        return user
      })
    default:
      return state
  }
}

export const userGroupsListReducer = (state = [], action) => {
  switch (action.type) {
    case 'USER_GROUPS_LIST_INIT':
      return action.groups
    default:
      return state
  }
}

export const balanceModalReducer = (
  state = { showed: false, data: [] },
  action
) => {
  switch (action.type) {
    case 'OPEN_BALANCE_MODAL':
      return {
        ...state,
        showed: true,
        userId: action.payload.userId,
        userName: action.payload.userName
      }
    case 'CLOSE_BALANCE_MODAL':
      return {
        showed: false,
        userId: undefined,
        userName: undefined,
        data: []
      }
    case 'UPDATE_BALANCE_MODAL':
      return {
        ...state,
        data: [...action.payload.balance]
      }
    default:
      return state
  }
}

export const statusListReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SYSTEM_STATUS_LIST_INIT':
      return {
        ...action.statusList
      }
    case 'SYSTEM_STATUS_LIST_MODULE_ONLINE':
      const moduleName = action.module
      let newState = { ...state }
      newState[moduleName] = true
      return newState
    case 'SYSTEM_STATUS_LIST_MODULE_OFFLINE':
      const moduleOfflineName = action.module
      let newOfflineState = { ...state }
      newOfflineState[moduleOfflineName] = false
      return newOfflineState
    default:
      return state
  }
}
