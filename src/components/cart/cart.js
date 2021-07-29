import './styles.css'
import React, { Component } from 'react'

import cart from '../../assets/images/cart.svg'
import { CartItem } from '../cart-item'
import { connect } from 'react-redux'

class CartComponent extends Component {
  render = () => {
    const { cartList, showCartList, handleShowCart } = this.props
    return (
      <div className="cart" onClick={handleShowCart}>
        <div className="cart-symbol">
          <img src={cart} alt="Cart" />
          <div className="counter">{cartList.size}</div>
        </div>

        {showCartList && (
          <ul className="cart-list" onClick={handleShowCart}>
            {cartList.map((item, index) => (
              <CartItem product={item} key={index} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ cartList }) => {
  return {
    cartList,
  }
}

export const Cart = connect(mapStateToProps)(CartComponent)
