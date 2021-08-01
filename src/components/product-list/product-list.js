import './styles.css'
import React from 'react'
import { connect } from 'react-redux'

import Product from './components/product'
class ProductListComponent extends React.Component {
  render() {
    const { products, category } = this.props
    return (
      <section className="list-products">
        <div className="category">{category}</div>
        <ul>
          {products.map((product) => {
            return <Product key={product.id} />
          })}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  const { products } = state.products
  const { activeCategory } = state.categories
  return {
    products,
    category: activeCategory,
  }
}

export const ProductList = connect(mapStateToProps)(ProductListComponent)
