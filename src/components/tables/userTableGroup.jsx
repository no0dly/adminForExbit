import React, { Component } from 'react'
import styled from 'styled-components'
import uuid from 'node-uuid'

import * as io from '../homepage/Homepage'

export class userTableGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditMode: false,
      errorMessage: {
        type: undefined,
        text: undefined
      }
    }
  }

  renderEditMode(name, userGroupsList, id) {
    const renderOptions = (userGroupsList) => {
      return userGroupsList.map((group) => {
        return <option key={ group.id } value={ group.id }>{ group.name }</option>
      })
    }
    return (
      <div key={ uuid() }>
        <Select className="control is-small">
          <div className="select is-small">
            <select
              ref={ (select) => { this.selectInp = select } }
              defaultValue={ id }>
              { renderOptions(userGroupsList) }
            </select>
          </div>
        </Select>
        <Link href="#" onClick={ this.changeMode.bind(this) }>
          <i className="fa fa-times" aria-hidden="true" />
        </Link>
        <Link href="#" onClick={ this.submitChanges.bind(this) }>
          <i className="fa fa-check" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  renderCommonMode(name, id) {
    return (
      <div key={ uuid() } ref={ (value) => { this.fieldPrevId = id } } >
        { name }
        <Link href="#" onClick={ this.changeMode.bind(this) }>
          <i className="fa fa-pencil" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  renderContent() {
    const { userGroupsList, item, field } = this.props
    const { isEditMode } = this.state

    return userGroupsList.map((group) => {
      if (item[field] === group.id) {
        if (isEditMode) {
          return this.renderEditMode(group.name, userGroupsList, group.id)
        } else {
          return this.renderCommonMode(group.name, group.id)
        }
      }
    })
  }
  renderMessage() {
    const { errorMessage } = this.state
    if (errorMessage.text) {
      setTimeout(() => {
        this.setState({
          errorMessage: {
            type: undefined,
            text: undefined
          }
        })
      }, 5000)

      if (errorMessage.type === 'success') {
        return (
          <div className="tags has-addons">
            <span className="tag is-success">{ errorMessage.text }</span>
            <a className="tag is-delete" onClick={ this.clearError.bind(this) } />
          </div>
        )
      } else {
        return (
          <div className="tags has-addons">
            <span className="tag is-danger">{ errorMessage.text }</span>
            <a className="tag is-delete" onClick={ this.clearError.bind(this) } />
          </div>
        )
      }
    }
  }

  changeMode(e) {
    e.preventDefault()

    this.setState((prevState, props) => {
      return {
        isEditMode: !prevState.isEditMode
      }
    })
  }
  submitChanges(e) {
    e.preventDefault()
    const prevValue = this.fieldPrevId
    const curValue = +this.selectInp.value
    const { userId } = this.props
    const data = {
      'user_id': userId,
      'group_id': curValue
    }
    if (prevValue !== curValue) {
      io.socket.emit('user_change_group', data, (response) => {
        if (response.success) {
          this.setState({
            errorMessage: {
              type: 'success',
              text: 'Group was changed'
            }
          })
        } else {
          this.setState({
            errorMessage: {
              type: 'error',
              text: response.error
            }
          })
        }
      })
    }
    this.setState((prevState, props) => {
      return {
        isEditMode: !prevState.isEditMode
      }
    })
  }
  clearError(e) {
    e.preventDefault()
    this.setState({
      errorMessage: {
        type: undefined,
        text: undefined
      }
    })
  }
  render() {
    return (
      <td>
        { this.renderContent() }
        { this.renderMessage() }
      </td>
    )
  }
}

const Select = styled.div`
  display: inline-block;
`

const Link = styled.a`
  display: inline-block;
  color: #717171;
  font-size: 0.8125rem;
  transition: 0.3s;
  margin-left: 10px;
  padding: 5px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;

  &:hover,
  &.active {
    color: #00aff0;
  }
  .fa {
    font-size: 1rem!important;
  }
`

export default userTableGroup
