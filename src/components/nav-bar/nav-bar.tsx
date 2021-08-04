import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

import logo from '../../assets/images/logo.svg'
import { Categories } from './categories'
import { CurrencyCartContainer } from './currency-cart-container'

export class NavBar extends Component {
  render = () => {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav">
            <Categories />
            <CurrencyCartContainer />
          </div>
          <div className="logo-container">
            <Link to="/products">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}
