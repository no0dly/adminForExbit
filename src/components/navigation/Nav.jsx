import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import NavItem from './NavItem'

import * as actions from '../../actions'

import * as io from '../homepage/Homepage'

export class Nav extends Component {
  showPopup() {
    const { dispatch } = this.props
    dispatch(actions.openLoginPopup())
  }
  logOut(e) {
    const { dispatch } = this.props
    io.socket.emit('logout')
    dispatch(actions.clearUser())
    dispatch(actions.openLoginPopup())
  }

  render() {
    const { user } = this.props

    // const nav = [
    //   {
    //     title: 'Home',
    //     href: '/',
    //     rounded: false
    //   },
    //   {
    //     title: 'trade',
    //     href: '/trade',
    //     rounded: false
    //   },
    //   {
    //     title: 'about',
    //     href: '/about',
    //     rounded: false
    //   },
    //   {
    //     title: 'faq',
    //     href: '/faq',
    //     rounded: false
    //   },
    //   {
    //     title: 'news',
    //     href: '/news',
    //     rounded: false
    //   }
    // ]

    let actions = [
      {
        title: 'login',
        href: '',
        rounded: true,
        onClick: this.showPopup.bind(this)
      }
    ]
    if (user.username) {
      actions = [
        {
          title: 'Logout',
          href: '',
          rounded: true,
          onClick: this.logOut.bind(this)
        },
        {
          title: user.username,
          href: '',
          styleLink: 'userName'
        }
      ]
    }
    // const renderItems = () => {
    //   return nav.map((item, idx) => {
    //     return <NavItem key={ idx } { ...item } />
    //   })
    // }

    const renderActions = () => {
      return actions.map((item, idx) => {
        return <NavItem key={ idx } { ...item } />
      })
    }

    return (
      <List>
        { renderActions() }
      </List>
    )
  }
}

const List = styled.ul`
  display: flex;
  justify-content: space-between;
`

export default connect(
  (state) => {
    return {
      user: state.user
    }
  }
)(Nav)
