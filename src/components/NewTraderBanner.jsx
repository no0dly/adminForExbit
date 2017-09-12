import React from 'react'
import styled from 'styled-components'

const NewTraderBanner = (props) => {
  return (
    <Wrap>
      <div className="container">
        <SubTitle>
          <SubTitleText>
            new to trading?
          </SubTitleText>
        </SubTitle>
        <Title>
          <TitleText>
            Open account for free and start trading Bitcoins now!
          </TitleText>
        </Title>
        <Button>Get Started</Button>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  text-align: center;
  padding: 110px 0;
  background: #0183b4;
`

const SubTitle = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  position: relative;
  &:after {
    content: '';
    width: 40px;
    height: 2px;
    opacity: 0.3;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -20px;
  }
`

const SubTitleText = styled.div`
  color: #fff;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
`

const Title = styled.div`
  margin-bottom: 40px;
`

const TitleText = styled.div`
  color: #fff;
  font-size: 1.625rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
`

const Button = styled.button`
  background: #fff;
  color: #0183b4;
  font-size: 0.875rem;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  border: none;
  border-radius: 5px;
  transition: 0.3s;
  padding: 15px 30px;
  text-transform: uppercase;
  &:hover {
    background: #ddd;
  }
`

export default NewTraderBanner
