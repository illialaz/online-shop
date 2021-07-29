import './styles.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { all, tech, clothes } from './constants'
import { Category } from '../category'

export class CategoriesComponent extends Component {
  render = () => {
    const { activeCategory } = this.props
    return (
      <ul className="categories">
        <Category category={all} active={activeCategory === all} />
        <Category category={clothes} active={activeCategory === clothes} />
        <Category category={tech} active={activeCategory === tech} />
      </ul>
    )
  }
}

const mapStoreToProps = ({ activeCategory }) => {
  return {
    activeCategory,
  }
}

export const Categories = connect(mapStoreToProps)(CategoriesComponent)
