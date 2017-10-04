import React from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

import Logo from '../images/Logo.svg'

import Nav from './navigation/Nav'

const Header = (props) => {
  return (
    <Wrap className="container">
      <LogoWrap to="/">
        <LogoImg src={ Logo } alt="Logo" />
      </LogoWrap>
      <TitleWrap className="">
        <h2 className="title is-3"> Admin Panel </h2>
        <Link onlyActiveOnIndex to="/" activeClassName="active">
          <span className="icon has-text-success">
            <i className="fa fa-money" />
          </span>
        </Link>
        <Link to="users" activeClassName="active">
          <span className="icon has-text-success">
            <i className="fa fa-user" />
          </span>
        </Link>
      </TitleWrap>
      <Nav />
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.container {
    margin-top: 35px;
    margin-bottom: 35px;
  }
  .title:not(:last-child),
  h2 {
    margin-bottom: 0;
  }
`

const LogoWrap = styled(Link)`
  width: 233px;
  height: 48px;
`

const LogoImg = styled.img`
  width: 100%;
  height: auto;
`

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-left: 20px;
    &.active span {
      color: #3273dc !important;
    }
  }

`

export default Header
