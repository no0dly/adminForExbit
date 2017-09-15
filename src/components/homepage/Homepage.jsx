import React, { Component } from 'react'
// import styled from 'styled-components'
import { connect } from 'react-redux'

import OrderTable from '../tables/orderTable'
import LoginPopup from '../LoginPopup'
import ConfirmPopup from '../ConfirmPopup'

import tableConstants from '../../constants/tableTitles'

import * as actions from '../../actions'

import io from 'socket.io-client'

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL)

export class Homepage extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    socket.on('full_orders_list_init', (response) => {
      console.log('full_orders_list_init')
      dispatch(actions.ordersInit(response))
    })
    socket.on('full_orders_list_add', (response) => {
      console.log('orders_add')
      dispatch(actions.ordersAdd(response))
    })

    socket.on('full_orders_list_remove', (response) => {
      console.log('orders_remove')
      dispatch(actions.ordersRemove(response.order_id))
    })

    socket.on('full_orders_list_update', (response) => {
      console.log('my_orders_update')
      dispatch(actions.ordersUpdate(response.order_id, response.amount))
    })

    socket.on('user_info', (response) => {
      console.log('user_info')
      dispatch(actions.updateUser(response))
    })
  }
  onSubmit(data) {
    const { dispatch } = this.props
    const credentials = {
      login: data.login,
      password: data.password
    }

    socket.emit('login', credentials, (response) => {
      console.log('login')
      if (!response.success) {
        dispatch(actions.setError(response.error))
      } else {
        dispatch(actions.closeLoginPopup())
      }
    })
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
  removeMyorder() {
    const { orderId } = this.props
    const callback = (response) => {
      console.log('order_remove_result')
      if (response.success) {
        this.notify.success('Success', `${response.success}, order ID: ${orderId}`, 4000)
      } else {
        this.notify.error('Error', `${response.error}`, 4000)
      }
    }
    socket.emit('order_remove', { 'order_id': orderId }, callback.bind(this))
    this.onConfirm(orderId)
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
        <LoginPopup onSubmit={ this.onSubmit.bind(this) } />
        <ConfirmPopup onSubmit={ this.removeMyorder.bind(this) } />
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
