import React from 'react'
import { connect } from 'react-redux'
import './styles.css'

import {
  increaseProductCount,
  decreaseProductCount,
  deleteProduct,
} from '../../../store/actions'
import plus from '../../../assets/images/plus.svg'
import minus from '../../../assets/images/minus.svg'
import { Selector } from '../selector'

class CartItemComponent extends React.Component {
  render = () => {
    const {
      product,
      currency,
      increaseProductCount,
      decreaseProductCount,
      deleteProduct,
      cartId,
      currencyName,
    } = this.props
    const { name, prices, count, photoes, attributes, ownAttributes } = product
    const photo = photoes[0]
    return (
      <ul className="cart-item">
        <div className="description">
          <div className="name">{name}</div>
          <div className="price">
            {currency}
            {prices[currencyName].toFixed(2)}
          </div>
          <ul className="selectors">
            {attributes.map((item, index) => (
              <Selector
                attributes={item}
                selector={ownAttributes[item.key]}
                cartId={cartId}
                key={index}
              />
            ))}
          </ul>
        </div>
        <div className="count">
          <button
            type="button"
            className="count-button"
            onClick={() => {
              increaseProductCount(cartId)
            }}
          >
            <img src={plus} alt="plus" />
          </button>
          {count}
          <button
            type="button"
            className="count-button"
            onClick={() => {
              count === 1 ? deleteProduct(cartId) : decreaseProductCount(cartId)
            }}
          >
            <img src={minus} alt="minus" />
          </button>
        </div>
        <div className="photo">
          <img src={photo} alt="Item" id="main-photo" />
        </div>
      </ul>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { currency, currencyList } = state.currency
  const { cart } = state.cart
  return {
    currency: currencyList[currency].short,
    currencyName: currency,
    product: cart[ownProps.cartId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseProductCount: (cartId) => dispatch(increaseProductCount(cartId)),
    decreaseProductCount: (cartId) => dispatch(decreaseProductCount(cartId)),
    deleteProduct: (cartId) => dispatch(deleteProduct(cartId)),
  }
}

export const CartItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemComponent)
