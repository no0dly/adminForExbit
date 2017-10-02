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
      <div className="">
        <h2 className="title is-3"> Admin Panel </h2>
      </div>
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

export default Header
