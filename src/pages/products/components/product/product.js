import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.css'

import whiteCart from '../../../../assets/images/whitecart.svg'
import { addToCart } from '../../../../store/actions'

class ProductComponent extends React.Component {
  render() {
    const { productId, product, currency, currencyName, addToCart } = this.props
    const { name, prices, photoes, inStock, attributes } = product
    const photo = photoes[0]
    return (
      <li className={'list-product ' + (inStock ? '' : 'out-of-stock')}>
        <Link to={'products/' + productId}>
          <img className="main-image" src={photo} alt="prod" />
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
              addToCart({ ...product, ownAttributes: [] })
            }}
          >
            <img src={whiteCart} alt="cart"></img>
          </div>
        )}
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { products } = state.products
  const { currency, currencyList } = state.currency
  return {
    product: products[ownProps.productId],
    currency: currencyList[currency].short,
    currencyName: currency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
  }
}

export const Product = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComponent)
