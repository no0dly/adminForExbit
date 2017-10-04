import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
// import uuid from 'node-uuid'
import UserTableGroup from './userTableGroup'

import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export class NewUserTable extends Component {
  render() {
    const { data, userGroupsList } = this.props

    return (
      <Wrap>
        <ReactTable
          data={ data }
          filterable
          defaultFilterMethod={ (filter, row) =>
            String(row[filter.id]) === filter.value }
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
                  Header: 'Btc free',
                  id: 'btc_free',
                  accessor: d => d.balance.btc_free,
                  filterable: false
                },
                {
                  Header: 'Btc frozen',
                  id: 'btc_frozen',
                  accessor: d => d.balance.btc_frozen,
                  filterable: false
                },
                {
                  Header: 'Btc total',
                  id: 'btc_total',
                  accessor: d => d.balance.btc_total,
                  filterable: false
                },
                {
                  Header: 'Usd free',
                  id: 'usd_free',
                  accessor: d => d.balance.usd_free,
                  filterable: false
                },
                {
                  Header: 'Usd frozen',
                  id: 'usd_frozen',
                  accessor: d => d.balance.usd_frozen,
                  filterable: false
                },
                {
                  Header: 'Usd total',
                  id: 'usd_total',
                  accessor: d => d.balance.usd_total,
                  filterable: false
                },
                {
                  Header: 'Group',
                  id: 'group',
                  accessor: d => d.group,
                  filterable: false,
                  minWidth: 140,
                  Cell: (cell) => {
                    return (
                      <UserTableGroup userId={ cell.row.user_id } item={ cell.row._original } field="group" userGroupsList={ userGroupsList } />
                    )
                  }
                }

              ]
            }
          ] }
          defaultPageSize={20}
          style={{
            height: "500px"
          }}
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

export default NewUserTable
