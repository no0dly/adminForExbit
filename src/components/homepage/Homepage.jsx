import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactNotify from 'react-notify'

import OrderTable from '../tables/orderTable'
import UserTable from '../tables/userTable'
import NewUserTable from '../tables/newUserTable'
import NewSortTable from '../tables/newSortTable'
import LoginPopup from '../LoginPopup'
import ConfirmPopup from '../ConfirmPopup'

import tableConstants from '../../constants/tableTitles'

import * as actions from '../../actions'

import io from 'socket.io-client'

export const socket = io(process.env.REACT_APP_WEBSOCKET_URL)

export class Homepage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(actions.openLoginPopup())
    socket.on('full_orders_list_init', (response) => {
      console.log('full_orders_list_init')
      dispatch(actions.ordersInit(response))
    })
    socket.on('full_orders_list_add', (response) => {
      console.log('full_orders_list_add')
      dispatch(actions.ordersAdd(response))
    })

    socket.on('full_orders_list_remove', (response) => {
      console.log('full_orders_list_remove')
      dispatch(actions.ordersRemove(response.order_id))
    })

    socket.on('full_orders_list_update', (response) => {
      console.log('full_orders_list_update')
      dispatch(actions.ordersUpdate(response.order_id, response.amount))
    })

    socket.on('user_info', (response) => {
      console.log('user_info')
      dispatch(actions.updateUser(response))
      dispatch(actions.closeLoginPopup())
    })

    socket.on('users_list_init', (response) => {
      console.log('users_list_init')
      dispatch(actions.usersListInit(response))
    })
    socket.on('users_list_add', (response) => {
      console.log('users_list_add')
      dispatch(actions.usersListAdd(response))
    })
    socket.on('users_list_update', (response) => {
      console.log('users_list_update')
      dispatch(actions.usersListUpdate(response))
    })
    socket.on('usergroups_list', (response) => {
      console.log('usergroups_list')
      dispatch(actions.userGroupsListInit(response))
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
        <div className="column is-12">
          <OrderTable title="Open Orders"
            headers={ openOrdersHeaders }
            data={ orders }
            height="233px" />
        </div>
      )
    }
  }
  renderSortTable() {
    const { user, orders } = this.props

    if (user.username) {
      return (
        <div className="column is-12">
          <NewSortTable orders={ orders } />
        </div>
      )
    }
  }
  renderTableThatHides(headers, data, height) {
    const { user, userGroupsList } = this.props
    if (user.username) {
      return (
        <div className="column is-12">
          <UserTable title="Users List"
            headers={ headers }
            data={ data }
            height={ height }
            userGroupsList={ userGroupsList } />
        </div>
      )
    }
  }
  renderNewUserTable(data) {
    const { user, userGroupsList } = this.props
    if (user.username) {
      return (
        <div className="column is-12">
          <NewUserTable title="Users List"
            data={ data }
            userGroupsList={ userGroupsList } />
        </div>
      )
    }
  }
  render() {
    const {
      usersListHeaders
    } = tableConstants.En
    const { usersList } = this.props
    return (
      <div>
        <div className="columns is-multiline">
          { this.renderSortTable() }
          { this.renderNewUserTable(usersList) }
        </div>
        <NotifyWrap>
          <ReactNotify ref={ (com) => this.notify = com } />
        </NotifyWrap>
        <LoginPopup onSubmit={ this.onSubmit.bind(this) } />
        <ConfirmPopup onSubmit={ this.removeMyorder.bind(this) } />
        {this.props.children}
      </div>
    )
  }
}

const NotifyWrap = styled.div`
  .notify-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: flex-start;
    align-content: flex-start;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99999;
  }

  .notify-item {
    width: 250px;
    margin: 5px 10px;
    color: #FFF;
    border-radius: 5px;
  }

  .notify-item:hover {
    opacity: 0.8;
    box-shadow: 0 0 10px 0 rgb(15, 15, 15);
  }

  .notify-item > p {
    font-family: 'Lora', serif;
    margin: 10px;
    opacity: .8;
  }

  .notify-item.success {
    background-color: rgba(81, 163, 81, 0.4);
  }

  .notify-item.error {
    background-color: rgba(203, 100, 94, 0.8);
  }

  .notify-item.info {
    background-color: rgba(33, 150, 243, 0.8);
  }

  .notify-title {
    font-weight: 700;
  }
`

export default connect(
  (state) => {
    return {
      user: state.user,
      orders: state.orders,
      orderId: state.confirmPopup.orderId,
      usersList: state.usersList,
      userGroupsList: state.userGroupsList
    }
  }
)(Homepage)
