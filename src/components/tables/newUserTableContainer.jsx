import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'

import NewUserTable from './newUserTable'
import UserBalanceModal from '../UserBalanceModal'

export class NewUserTableContainer extends Component {
  renderBalanceModal() {
    const { isBalanceModalShowed } = this.props
    if (isBalanceModalShowed) {
      return <UserBalanceModal />
    }
  }
  render() {
    const { usersList, userGroupsList } = this.props
    return (
      <div className="column is-12">
        <NewUserTable
          title="Users List"
          data={ usersList }
          userGroupsList={ userGroupsList }
        />
        {this.renderBalanceModal()}
      </div>
    )
  }
}

export default connect(state => {
  return {
    usersList: state.usersList,
    userGroupsList: state.userGroupsList,
    isBalanceModalShowed: state.balanceModal.showed
  }
})(NewUserTableContainer)
