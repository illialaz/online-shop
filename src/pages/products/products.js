import React, { Component } from 'react'
import './styles.css'
import { connect } from 'react-redux'

import { ProductList } from '../../components/product-list'

class ProductsComponent extends Component {
  render() {
    const { loading, category } = this.props
    return (
      <div className="products-page">
        <div className="category-name">{category}</div>
        {loading && <div>Loading...</div>}
        <ProductList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { loading } = state.products
  const { activeCategory: category } = state.categories
  return {
    loading,
    category,
  }
}

export const Products = connect(mapStateToProps)(ProductsComponent)
