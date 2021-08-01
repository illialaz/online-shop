import './styles.css'
import React, { Component } from 'react'

import { Cart } from '../cart'
import { Currency } from '../currency'

export class CurrencyCartContainer extends Component {
  render = () => {
    return (
      <div className="nav-left">
        <Currency />
        <Cart />
      </div>
    )
  }
}
