import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.css'

import whiteCart from '../../../../assets/images/whitecart.svg'

class ProductComponent extends React.Component {
  render() {
    const { productId, product, currency, currencyName } = this.props
    const { name, prices, photoes, inStock } = product
    const photo = photoes[0]
    return (
      <li className={'list-product ' + (inStock ? '' : 'out-of-stock')}>
        <img src={photo} alt="prod" />
        {!inStock && <div className="stock-descr">out of stock</div>}
        <div className="name-price-container">
          <div>{name}</div>
          <div className="product-price">
            {currency}
            {prices[currencyName]}
          </div>
        </div>
        <div className="hidden-cart-symbol">
          <Link to={'products/' + productId}>
            <img src={whiteCart} alt="cart"></img>
          </Link>
        </div>
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

export const Product = connect(mapStateToProps)(ProductComponent)
