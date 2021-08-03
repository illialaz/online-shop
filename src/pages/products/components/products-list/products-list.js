import React from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { Product } from '../product'

class ProductsListComponent extends React.Component {
  render() {
    const { productIds } = this.props
    return (
      <ul className="products-list">
        {productIds.map((id) => {
          return <Product key={id} productId={id} />
        })}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const { productIds } = state.products
  return {
    productIds,
  }
}

export const ProductsList = connect(mapStateToProps)(ProductsListComponent)
