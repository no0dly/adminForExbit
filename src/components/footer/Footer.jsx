import React from 'react'
import styled from 'styled-components'

import FooterList from './FooterList'
import FooterShareList from './FooterShareList'

import LogoFooter from '../../images/LogoFooter.svg'

const Footer = (props) => {
  return (
    <Wrap>
      <div className="container">
        <FooterTop className="columns">
          <FooterListWrap className="column is-9">
            <FooterList />
          </FooterListWrap>
          <FooterShare className="column is-3">
            <LogoWrap>
              <Logo src={ LogoFooter } alt="Logo footer" />
            </LogoWrap>
            <FooterShareList />
          </FooterShare>
        </FooterTop>
        <Copy>
          <CopyText>
            Copyright © 2016 - All rights reserved.
          </CopyText>
        </Copy>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding-top: 90px;
  background: #454545;
`

const FooterTop = styled.div`
  border-bottom: 1px solid #545454;
`

const FooterListWrap = styled.div`
  margin-bottom: 30px;
`

const Copy = styled.div`
  padding: 20px 0 30px;
  text-align: center;
`

const CopyText = styled.div`
  color: #fff;
  font-size: 0.8125rem;
  font-family: 'Raleway', sans-serif;
  opacity: 0.31;
`

const FooterShare = styled.div`

`

const LogoWrap = styled.div`
  width: 210px;
  height: 42px;
  margin: 0 auto;
`

const Logo = styled.img`
  width: 100%;
  height: auto;
`

export default Footer
