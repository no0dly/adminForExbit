import React, { Component } from 'react'
import { connect } from 'react-redux'
// import styled from 'styled-components'

import NewSortTable from './newSortTable'

export class NewSortTableContainer extends Component {
  render() {
    const { orders } = this.props
    return (
      <div className="column is-12">
        <NewSortTable orders={ orders } />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      orders: state.orders
    }
  }
)(NewSortTableContainer)
