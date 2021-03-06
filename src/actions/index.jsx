export const openLoginPopup = () => {
  return {
    type: 'OPEN_LOGIN_POPUP'
  }
}

export const closeLoginPopup = () => {
  return {
    type: 'CLOSE_LOGIN_POPUP'
  }
}

export const openConfirmPopup = (orderId, currencyPair) => {
  return {
    type: 'OPEN_CONFIRM_POPUP',
    payload: {
      orderId,
      currencyPair
    }
  }
}

export const closeConfirmPopup = () => {
  return {
    type: 'CLOSE_CONFIRM_POPUP'
  }
}

export const setError = error => {
  return {
    type: 'SET_ERROR',
    error
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}

export const updateUser = user => {
  return {
    type: 'UPDATE_USER',
    user
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export const ordersInit = orders => {
  return {
    type: 'ORDERS_INIT',
    orders
  }
}

export const ordersAdd = order => {
  return {
    type: 'ORDERS_ADD',
    order
  }
}

export const ordersRemove = id => {
  return {
    type: 'ORDERS_REMOVE',
    id
  }
}

export const ordersUpdate = (id, amount) => {
  return {
    type: 'ORDERS_UPDATE',
    id,
    amount
  }
}

export const usersListInit = users => {
  return {
    type: 'USERS_LIST_INIT',
    users
  }
}

export const usersListAdd = user => {
  return {
    type: 'USERS_LIST_ADD',
    user
  }
}

export const usersListUpdate = user => {
  return {
    type: 'USERS_LIST_UPDATE',
    user
  }
}

export const userGroupsListInit = groups => {
  return {
    type: 'USER_GROUPS_LIST_INIT',
    groups
  }
}

export const openBalanceModal = (userId, userName) => {
  return {
    type: 'OPEN_BALANCE_MODAL',
    payload: {
      userId,
      userName
    }
  }
}

export const closeBalanceModal = () => {
  return {
    type: 'CLOSE_BALANCE_MODAL'
  }
}

export const updateBalanceModal = balance => {
  return {
    type: 'UPDATE_BALANCE_MODAL',
    payload: { balance }
  }
}

export const systemStatusListInit = statusList => {
  return {
    type: 'SYSTEM_STATUS_LIST_INIT',
    statusList
  }
}

export const systemStatusListModuleOffline = moduleObj => {
  return {
    type: 'SYSTEM_STATUS_LIST_MODULE_OFFLINE',
    module: moduleObj.module
  }
}

export const systemStatusListModuleOnline = moduleObj => {
  return {
    type: 'SYSTEM_STATUS_LIST_MODULE_ONLINE',
    module: moduleObj.module
  }
}
