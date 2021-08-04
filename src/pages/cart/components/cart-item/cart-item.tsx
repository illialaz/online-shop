import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from 'redux'
import './styles.css'

import plus from '../../../../assets/images/bigplus.svg'
import minus from '../../../../assets/images/bigminus.svg'
import arrowLeft from '../../../../assets/images/arrowLeft.svg'
import arrowRight from '../../../../assets/images/arrowRight.svg'
import {
  increaseProductCount,
  decreaseProductCount,
  deleteProduct,
} from '../../../../store/actions'
import { Selector } from '../selector'
import { RootState } from '../../../../store/types'

type OwnProps = {
  cartId: number
}

type Props = PropsFromRedux & OwnProps

type State = {
  currentPhoto: number
}

class CartItemComponent extends Component<Props, State> {
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
    const { currentPhoto } = this.state
    const { photoes, name, count, attributes, prices, ownAttributes } = product
    return (
      <li className="cartpage-item">
        <div className="cartitem-descr">
          <div>{name}</div>
          <div className="cartitem-price">
            {currency} {prices[currencyName]}
          </div>
          <ul>
            {attributes.map((item) => {
              return (
                <Selector
                  attributes={item}
                  ownAttribute={ownAttributes[item.key]}
                  cartId={cartId}
                  key={item.key}
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
            <div
              className="cartphoto-frame"
              style={{
                transform: `translate(${-141 * currentPhoto}px, 0)`,
              }}
            >
              {photoes.map((photo) => (
                <img key={photo} src={photo} alt="cart product" />
              ))}
            </div>
          </div>
          <div className="prev-next-photoes">
            <div onClick={() => this.prevPhoto()}>
              <img className="shadow-photo" src={arrowLeft} alt="prev" />
            </div>
            <div onClick={() => this.nextPhoto()}>
              <img className="shadow-photo" src={arrowRight} alt="next" />
            </div>
          </div>
        </div>
      </li>
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
