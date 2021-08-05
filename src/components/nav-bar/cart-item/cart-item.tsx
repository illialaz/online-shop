import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import './styles.css'

import {
  increaseProductCount,
  decreaseProductCount,
  deleteProduct,
} from '../../../store/actions'
import plus from '../../../assets/images/plus.svg'
import minus from '../../../assets/images/minus.svg'
import { Selector } from '../selector'
import { RootState } from '../../../store/types'

type OwnProps = {
  cartId: number
}

type Props = PropsFromRedux & OwnProps

class CartItemComponent extends Component<Props> {
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
      <div className="cart-item">
        <div className="description">
          <div className="name">{name}</div>
          <div className="price">
            {currency}
            {prices[currencyName].toFixed(2)}
          </div>
          <div className="selectors">
            {attributes.map((item) => (
              <Selector
                attributes={item}
                selector={ownAttributes[item.key]}
                cartId={cartId}
                key={item.key}
              />
            ))}
          </div>
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
          <img src={photo} alt="cart product" className="main-photo" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { currency, currencyList } = state.currency
  const { cart } = state.cart
  return {
    currency: currencyList[currency].short,
    currencyName: currency,
    product: cart[ownProps.cartId],
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    increaseProductCount: (cartId: number) =>
      dispatch(increaseProductCount(cartId)),
    decreaseProductCount: (cartId: number) =>
      dispatch(decreaseProductCount(cartId)),
    deleteProduct: (cartId: number) => dispatch(deleteProduct(cartId)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const CartItem = connector(CartItemComponent)
