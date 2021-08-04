import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import './styles.css'

import whiteCart from '../../../../assets/images/whitecart.svg'
import { addToCart } from '../../../../store/actions'
import { RootState } from '../../../../store/types'
import { CartItem } from '../../../../types'

type OwnProps = {
  productId: string
}

type Props = PropsFromRedux & OwnProps

class ProductComponent extends Component<Props> {
  render() {
    const { productId, product, currency, currencyName, addToCart } = this.props
    const { name, prices, photoes, inStock, attributes } = product
    const photo = photoes[0]
    return (
      <li className={'list-product ' + (inStock ? '' : 'out-of-stock')}>
        <Link to={'products/' + productId}>
          <img className="main-image" src={photo} alt="product" />
          {!inStock && <div className="stock-descr">out of stock</div>}
          <div className="name-price-container">
            <div>{name}</div>
            <div className="product-price">
              {currency}
              {prices[currencyName]}
            </div>
          </div>
        </Link>
        {attributes.length === 0 && inStock && (
          <div
            className="hidden-cart-symbol"
            onClick={() => {
              addToCart({ ...product, ownAttributes: {}, count: 1 })
            }}
          >
            <img src={whiteCart} alt="add to cart"></img>
          </div>
        )}
      </li>
    )
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const { products } = state.products
  const { currency, currencyList } = state.currency
  return {
    product: products[ownProps.productId],
    currency: currencyList[currency].short,
    currencyName: currency,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addToCart: (product: CartItem) => dispatch(addToCart(product)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const Product = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent)
