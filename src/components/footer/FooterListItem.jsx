import React from 'react'
import styled from 'styled-components'

const FooterListItem = (props) => {
  const { items, title } = props.data
  const renderList = () => {
    return items.map((item, idx) => {
      return (
        <Item key={ idx }>
          <Link href="#">{ item }</Link>
        </Item>
      )
    })
  }

  return (
    <Wrap>
      <Title>
        <TitleText>{ title }</TitleText>
      </Title>
      <List>
        { renderList() }
      </List>
    </Wrap>
  )
}

const Wrap = styled.div`

`

const Title = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  position: relative;
  &:after {
    content: '';
    width: 40px;
    height: 2px;
    background: #8f8f8f;
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #515151;
  }
`

const TitleText = styled.div`
  color: #fff;
  font-size: 0.75rem;
  font-family: 'Raleway', sans-serif;
  text-transform: uppercase;
  letter-spacing: 5px;
`

const List = styled.ul`

`

const Item = styled.li`
  margin-bottom: 5px;
`

const Link = styled.a`
  color: #fff;
  font-size: 0.8125rem;
  font-family: 'Merriweather', serif;
  font-weight: 100;
  transition: 0.3s;
  &:hover {
    color: #ddd;
  }
`

export default FooterListItem
