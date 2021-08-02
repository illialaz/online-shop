import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { Selector } from '../selector'
import plus from '../../../../assets/images/bigplus.svg'
import minus from '../../../../assets/images/bigminus.svg'
import arrowLeft from '../../../../assets/images/arrowLeft.svg'
import arrowRight from '../../../../assets/images/arrowRight.svg'
import {
  increaseProductCount,
  decreaseProductCount,
  deleteProduct,
} from '../../../../store/actions'

class CartItemComponent extends Component {
  state = {
    currentPhoto: 0,
  }

  nextPhoto = () => {
    const photoes = this.props.product.photoes
    const { currentPhoto } = this.state
    this.setState({
      currentPhoto: currentPhoto === photoes.length - 1 ? 0 : currentPhoto + 1,
    })
  }

  prevPhoto = () => {
    const photoes = this.props.product.photoes
    const { currentPhoto } = this.state
    this.setState({
      currentPhoto: currentPhoto === 0 ? photoes.length - 1 : currentPhoto - 1,
    })
  }

  render() {
    const {
      cartId,
      product,
      currency,
      currencyName,
      increaseProductCount,
      decreaseProductCount,
      deleteProduct,
    } = this.props
    const { photoes, name, count, attributes, prices, ownAttributes } = product
    return (
      <li className="cartpage-item">
        <div className="cartitem-descr">
          <div>{name}</div>
          <div className="cartitem-price">
            {currency} {prices[currencyName]}
          </div>
          <ul>
            {attributes.map((item, index) => {
              return (
                <Selector
                  attributes={item}
                  ownAttribute={ownAttributes[item.key]}
                  cartId={cartId}
                  key={index}
                />
              )
            })}
          </ul>
        </div>
        <div className="counter-photo-container">
          <div className="cartitem-count">
            <button
              className="increase"
              type="button"
              onClick={() => {
                increaseProductCount(cartId)
              }}
            >
              <img src={plus} alt="plus" />
            </button>
            {count}
            <button
              type="button"
              className="decrease"
              onClick={() => {
                count === 1
                  ? deleteProduct(cartId)
                  : decreaseProductCount(cartId)
              }}
            >
              <img src={minus} alt="minus" />
            </button>
          </div>
          <div className="cartitem-photo">
            <img src={photoes[this.state.currentPhoto]} alt="cart product" />
          </div>
          <div className="prev-next-photoes">
            <div onClick={() => this.prevPhoto()}>
              <img src={arrowLeft} alt="prev" />
            </div>
            <div onClick={() => this.nextPhoto()}>
              <img src={arrowRight} alt="next" />
            </div>
          </div>
        </div>
      </li>
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
