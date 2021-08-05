import { Component } from 'react'
import { Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import './styles.css'

import { changeCategory, fetchProducts } from '../../../store/actions'
import { Categories } from '../../../types'

type Props = PropsFromRedux & {
  active: boolean
  category: Categories
}

export default class CategoryComponent extends Component<Props> {
  handleCategoryClick = () => {
    const { changeCategory, fetchProducts, category } = this.props
    changeCategory(category)
    fetchProducts(category)
  }

  render() {
    const { category, active } = this.props

    return (
      <div className={active ? 'active-category' : ''}>
        <Link
          to={'/products/' + category}
          className="category"
          onClick={this.handleCategoryClick}
        >
          {category}
        </Link>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeCategory: (category: Categories) =>
      dispatch(changeCategory(category)),
    fetchProducts: (category: Categories) =>
      dispatch(fetchProducts(category) as any),
  }
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const Category = connector(CategoryComponent)
