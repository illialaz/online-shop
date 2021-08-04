import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import './styles.css'

import { ProductsList } from './components/products-list'
import { RootState } from '../../store/types'

type Props = PropsFromRedux

class ProductsComponent extends Component<Props> {
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

const mapStateToProps = (state: RootState) => {
  const { loading } = state.products
  const { activeCategory: category } = state.categories
  return {
    loading,
    category,
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const Products = connector(ProductsComponent)
