import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import uuid from 'node-uuid'
import UserTableGroup from './userTableGroup'

import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import * as actions from '../../actions'

export class NewUserTable extends Component {
  openBalancesModal(id, e) {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(actions.openBalanceModal(id))
  }
  render() {
    const { data, userGroupsList } = this.props

    return (
      <Wrap>
        <ReactTable
          data={ data }
          filterable
          defaultFilterMethod={ (filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={ [
            {
              Header: 'Users',
              columns: [
                {
                  Header: 'User_id',
                  id: 'user_id',
                  accessor: d => d.user_id,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['user_id'] }),
                  filterAll: true,
                  minWidth: 50
                },
                {
                  Header: 'Username',
                  id: 'username',
                  accessor: d => d.username,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['username'] }),
                  filterAll: true
                },
                {
                  Header: 'Balance Equivalent, BTC',
                  id: 'balance_eq_btc',
                  accessor: d => d.balance_eq_btc,
                  filterable: false,
                  Cell: cell => {
                    return (
                      <a
                        href="#"
                        onClick={ this.openBalancesModal.bind(
                          this,
                          cell.row.user_id
                        ) }
                      >
                        {cell.row.balance_eq_btc}
                      </a>
                    )
                  }
                },
                {
                  Header: 'Group',
                  id: 'group',
                  accessor: d => d.group,
                  filterable: false,
                  minWidth: 140,
                  Cell: cell => {
                    return (
                      <UserTableGroup
                        userId={ cell.row.user_id }
                        item={ cell.row._original }
                        field="group"
                        userGroupsList={ userGroupsList }
                      />
                    )
                  }
                }
              ]
            }
          ] }
          defaultPageSize={ 20 }
          style={ {
            height: '500px'
          } }
          className="-striped -highlight"
        />
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  .ReactTable .rt-tr {
    align-items: center;
  }
  .ReactTable .rt-td {
    font-size: 0.75rem;
    padding: 0.25em 0.5em;
  }
`

export default connect()(NewUserTable)
