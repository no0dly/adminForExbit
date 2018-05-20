import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// import * as actions from '../../actions'

export class SystemStatusTable extends Component {
  renderList() {
    const { modules } = this.props
    return Object.keys(modules).map(module => {
      return (
        <tr key={ module }>
          <th>{module}</th>
          <Th
            className={
              modules[module]
                ? 'has-text-centered green'
                : 'has-text-centered red'
            }
          >
            <i
              title={ modules[module] ? 'online' : 'offline' }
              className="fa fa-circle"
              aria-hidden="true"
            />
          </Th>
        </tr>
      )
    })
  }
  render() {
    // const { modules } = this.props
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Module Name</th>
            <th className="has-text-centered">Status</th>
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
    )
  }
}

const Th = styled.th`
  text-align: center;
  &.green {
    color: green;
  }
  &.red {
    color: red;
  }
`

export default connect(state => {
  return {
    modules: state.statusList
  }
})(SystemStatusTable)
