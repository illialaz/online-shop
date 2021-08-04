import { Component } from 'react'
import './styles.css'

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
