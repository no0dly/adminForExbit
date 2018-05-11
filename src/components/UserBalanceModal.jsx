import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'
import { socket } from './homepage/Homepage'

import * as actions from '../actions'

export class UserBalanceModal extends Component {
  componentDidMount() {
    const { userId, dispatch } = this.props
    socket.emit('user_balance', { user_id: userId }, response => {
      if (response.success) {
        dispatch(actions.updateBalanceModal(response.balance))
      }
    })
  }
  closeModal() {
    const { dispatch } = this.props
    dispatch(actions.closeBalanceModal())
  }
  renderRows() {
    const { data } = this.props

    return data.map(balance => {
      return (
        <tr key={ balance.title }>
          <td>{balance.title}</td>
          <td>{balance.shortcut}</td>
          <td>{balance.free}</td>
          <td>{balance.frozen}</td>
          <td>{balance.total}</td>
        </tr>
      )
    })
  }
  render() {
    const { userId, userName } = this.props
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              {userName} (#{userId})
            </p>
            <button
              onClick={ this.closeModal.bind(this) }
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <table className="table is-narrow is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th className="has-text-centered">Currency</th>
                  <th className="has-text-centered">Short</th>
                  <th className="has-text-centered">Free</th>
                  <th className="has-text-centered">Frozen</th>
                  <th className="has-text-centered">Total</th>
                </tr>
              </thead>
              <tbody>{this.renderRows()}</tbody>
            </table>
          </section>
          <footer className="modal-card-foot">
            <button onClick={ this.closeModal.bind(this) } className="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    userId: state.balanceModal.userId,
    userName: state.balanceModal.userName,
    data: state.balanceModal.data
  }
})(UserBalanceModal)
