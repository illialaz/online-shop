import './styles.css'
import React, { Component } from 'react'

import logo from '../../assets/images/logo.svg'
import { Categories } from './components/categories'
import { CurrencyCartContainer } from './components/currency-cart-container'
import { Link } from 'react-router-dom'

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
