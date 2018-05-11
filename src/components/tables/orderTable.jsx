import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import styled, { keyframes } from 'styled-components'

import * as actions from '../../actions'

export class MyorderTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  renderHeaders() {
    const { headerNames } = this.props.headers

    return headerNames.map((header, idx) => {
      return <HeaderTh key={ idx }> {header} </HeaderTh>
    })
  }

  openConfirmPopup(id, e) {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(actions.openConfirmPopup(id))
  }

  renderData() {
    const { data } = this.props

    return data.map(item => {
      const date = moment.unix(item.created_at).format('DD/MM/YYYY hh:mm:ss')
      const { side, amount, price, user } = item
      const id = item.order_id

      return (
        <TableRow key={ id }>
          <td>{date}</td>
          <td>{side}</td>
          <td>{amount}</td>
          <td>{price}</td>
          <td>{user}</td>
          <ActionCell>
            <a
              onClick={ this.openConfirmPopup.bind(this, id) }
              className="button is-danger"
            >
              Remove
            </a>
          </ActionCell>
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
              <tr>{this.renderHeaders()}</tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </TableWrap>
      </Wrap>
    )
  }
}

const Wrap = styled.div`
  .title:not(:last-child),
  .subtitle:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const TableWrap = styled.div`
  max-height: ${props => (props.height ? props.height : 'auto')}
  overflow-y: auto;
  table {
    margin-bottom: 0;
  }
`

const ActionCell = styled.td`
  vertical-align: middle !important;
  text-align: center;
  .button {
    font-size: 0.625rem;
    height: 1.05rem;
    padding-top: calc(0.2em - 1px);
    padding-bottom: calc(0.2em - 1px);
    line-height: 1.4;
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
`

const HeaderTh = styled.th`
  font-size: 0.75rem;
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: #0183b4;
  color: #fff !important;
  z-index: 2;
`

export default connect()(MyorderTable)
