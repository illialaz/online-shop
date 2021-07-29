import './styles.css'
import React, { Component } from 'react'

import logo from '../../assets/images/logo.svg'
import { Categories } from '../categories'
import CurrencyCartContainer from '../currency-cart-container/currency-cart-container'

export class NavBar extends Component {
  render = () => {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <img src={logo} alt="Logo" />
          <div className="nav">
            <Categories />
            <CurrencyCartContainer />
          </div>
        </div>
      </nav>
    )
  }
}
