import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactNotify from 'react-notify'

import LoginPopup from '../LoginPopup'
import ConfirmPopup from '../ConfirmPopup'

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
      this.onConfirm()
    }
    socket.emit('order_remove', { 'order_id': orderId }, callback.bind(this))
  }

  renderConfirm() {
    const { showed } = this.props
    if (showed) {
      return <ConfirmPopup onSubmit={ this.removeMyorder.bind(this) } />
    }
  }
  render() {
    const { children, user } = this.props
    const renderContent = () => {
      if (user.username) {
        return children
      }
    }
    return (
      <div>
        <div className="columns is-multiline">
          { renderContent() }
        </div>
        <NotifyWrap>
          <ReactNotify ref={ (com) => this.notify = com } />
        </NotifyWrap>
        <LoginPopup onSubmit={ this.onSubmit.bind(this) } />
        { this.renderConfirm() }

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
      orderId: state.confirmPopup.orderId,
      showed: state.confirmPopup.showed
    }
  }
)(Homepage)
