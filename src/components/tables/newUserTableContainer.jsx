import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'

import NewUserTable from './newUserTable'

export class NewUserTableContainer extends Component {
  render() {
    const { usersList, userGroupsList } = this.props
    return (
      <div className="column is-12">
        <NewUserTable title="Users List"
          data={ usersList }
          userGroupsList={ userGroupsList } />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      usersList: state.usersList,
      userGroupsList: state.userGroupsList
    }
  }
)(NewUserTableContainer)
