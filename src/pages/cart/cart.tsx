import { Component } from 'react'
import './styles.css'

import { CartList } from './components/cart-list'

export class Cart extends Component {
  render() {
    return (
      <div className="cart-page">
        <div className="cart-inscription">cart</div>
        <CartList />
      </div>
    )
  }
}
