import React from 'react'
// import {Link} from 'react-router';

import Header from './Header'
// import Banner from './Banner'
// import NewTraderBanner from './NewTraderBanner'
// import Footer from './footer/Footer'

const App = (props) => {
  return (
    <div>
      <Header />
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default App
