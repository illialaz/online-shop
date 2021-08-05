import { Component } from 'react'
import { Dispatch } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import './styles.css'

import { changeCategory, fetchProducts } from '../../../store/actions'
import { Categories } from '../../../types'

type Props = PropsFromRedux & {
  active: boolean
  category: Categories
}

export default class CategoryComponent extends Component<Props> {
  render() {
    const { changeCategory, fetchProducts, category, active } = this.props
    return (
      <div className={active ? 'active-category' : ''}>
        <div
          className="category"
          onClick={() => {
            changeCategory(category)
            fetchProducts(category)
          }}
        >
          {category}
        </div>
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
