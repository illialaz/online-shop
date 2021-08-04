import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { ProductsList } from './components/products-list'

class ProductsComponent extends Component {
  render() {
    const { loading, category } = this.props
    return (
      <div className="products-page">
        <div className="category-name">{category}</div>
        {loading && <div>Loading...</div>}
        <ProductsList />
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
