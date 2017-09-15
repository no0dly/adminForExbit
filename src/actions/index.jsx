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

export const openConfirmPopup = (orderId) => {
  return {
    type: 'OPEN_CONFIRM_POPUP',
    orderId
  }
}

export const closeConfirmPopup = () => {
  return {
    type: 'CLOSE_CONFIRM_POPUP'
  }
}

export const setError = (error) => {
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

export const updateUser = (user) => {
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

export const ordersInit = (orders) => {
  return {
    type: 'ORDERS_INIT',
    orders
  }
}

export const ordersAdd = (order) => {
  return {
    type: 'ORDERS_ADD',
    order
  }
}

export const ordersRemove = (id) => {
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
