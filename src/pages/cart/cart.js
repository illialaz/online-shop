import React, { Component } from 'react'
import { CartList } from '../../components/cart-list'
import './styles.css'

export class Cart extends Component {
  render() {
    return (
      <div className="cart-page" onClick={() => console.log('CLICK')}>
        <CartList />
      </div>
    )
  }
}
