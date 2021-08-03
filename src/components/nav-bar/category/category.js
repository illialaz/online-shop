import React, { Component } from 'react'
import { connect } from 'react-redux'
import './styles.css'

import { changeCategory, fetchProducts } from '../../../store/actions'

export default class CategoryComponent extends Component {
  render() {
    const { changeCategory, fetchProducts, category, active } = this.props
    return (
      <li className={active ? 'active-category' : ''}>
        <div
          className="category"
          onClick={() => {
            changeCategory(category)
            fetchProducts(category)
          }}
        >
          {category}
        </div>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) => dispatch(changeCategory(category)),
    fetchProducts: (category) => dispatch(fetchProducts(category)),
  }
}

export const Category = connect(null, mapDispatchToProps)(CategoryComponent)
