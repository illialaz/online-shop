import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { CartItem } from './components/cart-item'

class CartListComponent extends Component {
  render() {
    const { cartIds } = this.props
    return (
      <ul className="cart-list">
        {cartIds.map((id) => (
          <CartItem key={id} cartId={id} />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const { cartIds } = state.cart
  return {
    cartIds,
  }
}

export const CartList = connect(mapStateToProps)(CartListComponent)
