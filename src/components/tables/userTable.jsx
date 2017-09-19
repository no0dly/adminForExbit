import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import uuid from 'node-uuid'

export class UserTable extends Component {
  renderHeaders() {
    const { headerNames } = this.props.headers

    return headerNames.map((header, idx) => {
      return <HeaderTh key={ idx }>{ header }</HeaderTh>
    })
  }

  renderValues(item) {
    const { userGroupsList } = this.props
    return Object.keys(item).map((field) => {
      if (field === 'balance') {
        return Object.keys(item[field]).map((balanceValue) => {
          return <td key={ uuid() }>{ item[field][balanceValue] }</td>
        })
      } else if (field === 'group') {
        return userGroupsList.map((group) => {
          if (item[field] === group.id) {
            return <td key={ uuid() }>{ group.name }</td>
          }
        })
      }
      return <td key={ uuid() }>{ item[field] }</td>
    })
  }
  renderData() {
    const { data } = this.props
    return data.map((user) => {
      return (
        <TableRow key={ uuid() }>
          { this.renderValues(user) }
        </TableRow>
      )
    })
  }

  render() {
    const { title, height } = this.props

    return (
      <Wrap>
        <h3 className="title is-5">{title}</h3>
        <TableWrap height={ height }>
          <table className="table is-bordered is-striped is-narrow">
            <thead>
              <tr>
                { this.renderHeaders() }
              </tr>
            </thead>
            <tbody>
              { this.renderData() }
            </tbody>
          </table>
        </TableWrap>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  .title:not(:last-child), .subtitle:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const TableWrap = styled.div`
  max-height: ${(props) => props.height ? props.height : 'auto'}
  overflow-y: auto;
  table {
    margin-bottom: 0;
  }
`

const adding = keyframes`
  0% { background-color: #00d1b2; }
  33% { background-color: transparent; }
  66% { background-color: #00d1b2; }
  100% { background-color: transparent; }
`

const TableRow = styled.tr`
  animation-name: ${adding};
  animation-duration: 2s;
  font-size: 0.75rem;
  & .red {
    color: red;
  }
  & .green {
    color: green;
  }
`

const HeaderTh = styled.th`
  font-size: 0.75rem;
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: #0183b4;
  color: #fff!important;
  z-index: 2;
`

export default UserTable
