import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeCategory } from '../categories/store/actions'

export default class CategoryComponent extends Component {
  render() {
    const { changeCategory, category, active } = this.props
    return (
      <li className={active ? 'active-category' : ''}>
        <div className="category" onClick={() => changeCategory(category)}>
          {category}
        </div>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) => dispatch(changeCategory(category)),
  }
}

export const Category = connect(null, mapDispatchToProps)(CategoryComponent)
