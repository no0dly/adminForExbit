import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router'

const NavItem = (props) => {
  const { rounded, styleLink } = props

  const onClickHandler = (e) => {
    e.preventDefault()
    props.onClick()
  }
  return (
    <Wrap styleLink>
      <LinkItem
        to={ props.href }
        activeClassName="active"
        className={ rounded ? 'rounded' : '' }
        onClick={ onClickHandler.bind(this) }
        >
        { (styleLink) ? <i className="fa fa-user" aria-hidden="true" /> : '' }
        { props.title }
      </LinkItem>
    </Wrap>
  )
}

const Wrap = styled.li`

`

const LinkItem = styled(Link)`
  display: block;
  text-transform: uppercase;
  color: #717171;
  font-size: 0.8125rem;
  transition: 0.3s;
  padding: 5px 15px;
  margin: 0 10px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;

  &.rounded {
    border: 1px solid #717171;
    border-radius: 5px;
    &:hover {
      border-color: #00aff0;
    }
  }

  &:hover,
  &.active {
    color: #00aff0;
  }
  i {
    margin-right: 10px;
    position: relative;
    top: -2px;
  }
`

export default NavItem
