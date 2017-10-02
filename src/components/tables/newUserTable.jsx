import React, { Component } from 'react'
// import styled, { keyframes } from 'styled-components'
// import uuid from 'node-uuid'
import UserTableGroup from './userTableGroup'

import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export class NewUserTable extends Component {
  render() {
    const { title, data, userGroupsList } = this.props

    return (
      <div>
        <h3 className="title is-5">{title}</h3>
        <ReactTable
          data={ data }
          filterable
          defaultFilterMethod={ (filter, row) =>
            String(row[filter.id]) === filter.value }
          columns={ [
            {
              columns: [
                {
                  Header: 'User_id',
                  id: 'user_id',
                  accessor: d => d.user_id,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['user_id'] }),
                  filterAll: true
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
                  Cell: (cell) => {
                    return (
                      <UserTableGroup userId={ cell.row.user_id } item={ cell.row._original } field="group" userGroupsList={ userGroupsList } />
                    )
                  }
                }

              ]
            }
          ] }
          defaultPageSize={ 10 }
          className="-striped -highlight"
        />
      </div>
    )
  }
}


export default NewUserTable
