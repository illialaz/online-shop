import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { CartItem } from './components/cart-item'

class CartListComponent extends Component {
  render() {
    const { cartIds, cart } = this.props
    return (
      <ul className="cart-list">
        {cartIds.map((id) => (
          <CartItem key={id} product={cart[id]} cartId={id} />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const { cartIds, cart } = state.cart
  return {
    cartIds,
    cart,
  }
}

export const CartList = connect(mapStateToProps)(CartListComponent)
