import React, { Component } from 'react'
// import styled from 'styled-components'

import FooterListItem from './FooterListItem'

export class FooterList extends Component {
  render() {
    const data = [
      {
        title: 'Services',
        items: [
          'Buy Bitcoins',
          'Buy Ethereum',
          'Sell Bitcoins',
          'Bitcoin Trading',
          'Cloud Mining'
        ]
      },
      {
        title: 'Information',
        items: [
          'Payment Options',
          'Transaction Fees',
          'Getting Started',
          'Identity Verification'
        ]
      },
      {
        title: 'About',
        items: [
          'About Us',
          'Legal',
          'Press',
          'Blog',
          'Help Centre'
        ]
      },
      {
        title: 'Learn',
        items: [
          'What Is Bitcoin?',
          'Supported Countries',
          'Status',
          'Market'
        ]
      }
    ]
    return (
      <div className="columns">
        <div className="column is-3">
          <FooterListItem data={ data[0] } />
        </div>
        <div className="column is-3">
          <FooterListItem data={ data[1] } />
        </div>
        <div className="column is-3">
          <FooterListItem data={ data[2] } />
        </div>
        <div className="column is-3">
          <FooterListItem data={ data[3] } />
        </div>
      </div>
    )
  }
}
//
// const Wrap = styled.div`
//
// `

export default FooterList
