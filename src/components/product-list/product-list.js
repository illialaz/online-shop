import './styles.css'
import React from 'react'
import { connect } from 'react-redux'

import Product from './components/product'
class ProductListComponent extends React.Component {
  render() {
    const { products } = this.props
    return (
      <section className="list-products">
        {products.map((product) => {
          return <Product key={product.id} />
        })}
      </section>
    )
  }
}

const mapStoreToProps = ({ products }) => {
  return {
    products,
  }
}

export const ProductList = connect(mapStoreToProps)(ProductListComponent)
