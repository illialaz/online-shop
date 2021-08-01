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
          <Link to="/products">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              onClick={() => console.log('click')}
            />
          </Link>
          <div className="nav">
            <Categories />
            <CurrencyCartContainer />
          </div>
        </div>
      </nav>
    )
  }
}
