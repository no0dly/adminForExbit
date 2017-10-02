import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
// import uuid from 'node-uuid'

import matchSorter from 'match-sorter'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import * as actions from '../../actions'

export class NewSortTable extends Component {
  openConfirmPopup(id, e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(actions.openConfirmPopup(id))
  }
  render() {
    const { orders } = this.props
    return (
      <div>
        <ReactTable
          data={ orders }
          filterable
          defaultFilterMethod={ (filter, row) =>
            String(row[filter.id]) === filter.value }
          columns={ [
            {
              columns: [
                {
                  Header: 'Date',
                  id: 'date',
                  accessor: d => d.created_at,
                  filterable: false
                },
                {
                  Header: 'Order ID',
                  id: 'id',
                  accessor: d => d.order_id,
                  filterable: false
                },
                {
                  Header: 'Type',
                  id: 'type',
                  accessor: d => d.side,
                  filterable: false
                },
                {
                  Header: 'Amount BTC',
                  id: 'amount',
                  accessor: d => d.amount,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['amount'] }),
                  filterAll: true
                },
                {
                  Header: 'Price USD',
                  id: 'price',
                  accessor: d => d.price,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['price'] }),
                  filterAll: true
                },
                {
                  Header: 'User',
                  id: 'user',
                  accessor: d => d.user,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['user'] }),
                  filterAll: true
                },
                {
                  Header: 'Action',
                  id: 'action',
                  accessor: d => d.action,
                  filterable: false,
                  Cell: (cell) => {
                    return (
                      <ActionCell>
                        <a onClick={ this.openConfirmPopup.bind(this, cell.row.id) }
                          className="button is-danger" >
                          Remove
                        </a>
                      </ActionCell>
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

const ActionCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .button {
    font-size: 0.625rem;
    height: 1.05rem;
    padding-top: calc(0.2em - 1px);
    padding-bottom: calc(0.2em - 1px);
    line-height: 1.4;
  }
`

export default connect()(NewSortTable)
