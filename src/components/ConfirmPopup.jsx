import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'

import * as actions from '../actions'

export class ConfirmPopup extends Component {
  onClose(e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(actions.closeConfirmPopup())
  }

  onSubmitHandler(e) {
    e.preventDefault()
    this.props.onSubmit()
  }

  renderPopup() {
    const { showed } = this.props

    if (showed) {
      return (
        <div className="modal is-active">
          <div className="modal-background" />
          <form
            className="modal-card"
            onSubmit={ this.onSubmitHandler.bind(this) }
          >
            <header className="modal-card-head">
              <p className="modal-card-title">Confirmation</p>
              <button
                className="delete"
                aria-label="close"
                onClick={ this.onClose.bind(this) } />
            </header>
            <section className="modal-card-body">
              Are you sure, that you want to delete this order?
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={ this.onClose.bind(this) }
              >
                Close
              </button>
              <button className="button is-danger">
                Yes, remove
              </button>
            </footer>
          </form>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        { this.renderPopup() }
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      showed: state.confirmPopup.showed
    }
  }
)(ConfirmPopup)
