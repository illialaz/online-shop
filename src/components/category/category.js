import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeCategory } from '../../store/actions'

export default class CategoryComponent extends Component {
  render() {
    const { dispatch, category, active } = this.props
    return (
      <li
        className={active ? 'active-category' : ''}
        onClick={() => dispatch(changeCategory({ category }))}
      >
        {category}
      </li>
    )
  }
}

export const Category = connect()(CategoryComponent)
