import React from 'react'
import './styles.css'

import { Selector } from '../selector'
import { connect } from 'react-redux'
import plus from '../../../../assets/images/plus.svg'
import minus from '../../../../assets/images/minus.svg'
import {
  increaseProductCount,
  decreaseProductCount,
} from '../cart/store/actions'

class CartItemComponent extends React.Component {
  render = () => {
    const {
      product,
      currency,
      increaseProductCount,
      decreaseProductCount,
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
              console.log(cartId)
              increaseProductCount(cartId)
            }}
          >
            <img src={plus} alt="plus" />
          </button>
          {count}
          <button
            type="button"
            className="count-button"
            onClick={() => decreaseProductCount(cartId)}
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

const mapStateToProps = (state) => {
  const { currency, currencyList } = state.currency
  return {
    currency: currencyList[currency].short,
    currencyName: currency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseProductCount: (cartId) => dispatch(increaseProductCount(cartId)),
    decreaseProductCount: (cartId) => dispatch(decreaseProductCount(cartId)),
  }
}

export const CartItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemComponent)
