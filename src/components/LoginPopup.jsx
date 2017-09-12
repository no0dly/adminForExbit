import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'

import * as actions from '../actions'

export class LoginPopup extends Component {
  onClick(e) {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(actions.closeLoginPopup())
  }

  onSubmitHandler(action, e) {
    e.preventDefault()
    const { dispatch, onSubmit } = this.props
    const data = {
      login: this.loginInput.value,
      password: this.passwordInput.value,
      action
    }
    if (data.login.trim().length === 0 || data.password.trim().length === 0) {
      dispatch(actions.setError('Fill out both fields!'))
    } else {
      onSubmit(data)
      this.loginInput.value = ''
      this.passwordInput.value = ''
      dispatch(actions.clearError())
    }
  }

  changeMode(newMode, e) {
    e.preventDefault()

    const { dispatch } = this.props

    dispatch(actions.changeLoginPopupMode(newMode))
  }
  onKeyPress(action, e) {
    if (e.charCode === 13) {
      e.preventDefault()
      this.onSubmitHandler(action, e)
    }
  }

  renderPopup() {
    const { showed, mode, error } = this.props

    if (showed && mode === 'login') {
      return (
        <div className="modal is-active">
          <div className="modal-background" />
          <form className="modal-card"
            onKeyPress={ this.onKeyPress.bind(this, 'login') }
            onSubmit={ this.onSubmitHandler.bind(this, 'login') }
            ref={ (form) => this.loginForm = form } >
            <header className="modal-card-head">
              <p className="modal-card-title">Login</p>
              <button onClick={ this.onClick.bind(this) } href="#" className="delete" />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input"
                    type="text"
                    placeholder="Login"
                    required
                    ref={ (input) => this.loginInput = input } />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input"
                    type="password"
                    placeholder="Password"
                    required
                    ref={ (input) => this.passwordInput = input } />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock" />
                  </span>
                </p>
                <p className="help is-danger">{ error }</p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <input type="submit" className="button is-success" value="LOGIN" />
              <button className="button is-info"
                onClick={ this.changeMode.bind(this, 'signUp') }
                >
                  SIGN UP
              </button>
            </footer>
          </form>
        </div>
      )
    } else if (showed && mode === 'signUp') {
      return (
        <div className="modal is-active">
          <div className="modal-background" />
          <form className="modal-card"
            onSubmit={ this.onSubmitHandler.bind(this, 'signUp') }
            onKeyPress={ this.onKeyPress.bind(this, 'signUp') }
            ref={ (form) => this.loginForm = form }>
            <header className="modal-card-head">
              <p className="modal-card-title">Sign Up</p>
              <button onClick={ this.onClick.bind(this) } href="#" className="delete" />
            </header>
            <section className="modal-card-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input"
                    type="text"
                    placeholder="Login"
                    required
                    ref={ (input) => this.loginInput = input } />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input"
                    type="password"
                    placeholder="Password"
                    required
                    ref={ (input) => this.passwordInput = input } />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock" />
                  </span>
                </p>
                <p className="help is-danger">{ error }</p>
              </div>
            </section>
            <footer className="modal-card-foot">
              <input type="submit" className="button is-info" value="SIGN UP" />
              <button className="button is-success"
                onClick={ this.changeMode.bind(this, 'login') }
                >
                  I have an account
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

// const List = styled.ul`
//
// `

export default connect(
  (state) => {
    return {
      showed: state.loginPopup.showed,
      mode: state.loginPopup.mode,
      error: state.loginPopup.error
    }
  }
)(LoginPopup)
