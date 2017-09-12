import React, { Component } from 'react'
// import styled from 'styled-components'
import { connect } from 'react-redux'

import OrderTable from '../tables/orderTable'
import LoginPopup from '../LoginPopup'
// import ConfirmPopup from '../ConfirmPopup'

import tableConstants from '../../constants/tableTitles'

import * as actions from '../../actions'

import io from 'socket.io-client'

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL)

export class Homepage extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    socket.on('my_orders_init', (response) => {
      console.log('my_orders_init')
      dispatch(actions.ordersInit(response))
    })
    socket.on('my_orders_add', (response) => {
      console.log('my_orders_add')
      dispatch(actions.ordersAdd(response))
    })

    socket.on('my_orders_remove', (response) => {
      console.log('my_orders_remove')
      dispatch(actions.ordersRemove(response.order_id))
    })

    socket.on('my_orders_update', (response) => {
      console.log('my_orders_update')
      dispatch(actions.ordersUpdate(response.order_id, response.amount))
    })

    socket.on('user_info', (response) => {
      console.log('user_info')
      dispatch(actions.updateUser(response))
    })

    socket.on('login_result', (response) => {
      console.log('login_result')
      if (!response.success) {
        dispatch(actions.setError(response.error))
      } else {
        dispatch(actions.closeLoginPopup())
      }
    })

    socket.on('register_result', (response) => {
      console.log('register_result')
      if (!response.success) {
        dispatch(actions.setError(response.error))
      } else {
        dispatch(actions.closeLoginPopup())
      }
    })
  }
  onSubmit(data) {
    const credentials = {
      login: data.login,
      password: data.password
    }
    if (data.action === 'login') {
      socket.emit('login', credentials)
    } else if (data.action === 'signUp') {
      socket.emit('register', credentials)
    }
  }
  onLogOut() {
    const { dispatch } = this.props
    socket.emit('logout')
    dispatch(actions.clearUser())
  }
  onConfirm() {
    const { dispatch } = this.props
    dispatch(actions.closeConfirmPopup())
  }
  renderMyOrderTable() {
    const { user } = this.props
    const { orders } = this.props
    const { openOrdersHeaders } = tableConstants.En

    if (user.username) {
      return (
        <div className="column is-half">
          <OrderTable title="My Open Orders"
            headers={ openOrdersHeaders }
            data={ orders }
            height="233px" />
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        <div className="columns is-multiline">
          { this.renderMyOrderTable() }
        </div>
        <LoginPopup onSubmit={ this.onSubmit } />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      user: state.user,
      orders: state.orders
    }
  }
)(Homepage)
