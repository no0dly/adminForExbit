import React from 'react'
import styled from 'styled-components'

import bg from '../images/bannerBg.svg'

const Banner = (props) => {
  return (
    <Wrap>
      <div className="container">
        <Title>
          Welcome to ExchangeBit
        </Title>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  background: #00aff0;
  position: relative;
  margin-bottom: 30px;
  &:before {
    content: '';
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.5;
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`

const Title = styled.div`
  position: relative;
  z-index: 3;
  color: #fff;
  font-size: 2.5rem;
  font-family: 'Raleway', sans-serif;
`

export default Banner
