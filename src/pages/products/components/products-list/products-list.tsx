import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import './styles.css'

import { Product } from '../product'
import { RootState } from '../../../../store/types'

type Props = PropsFromRedux

class ProductsListComponent extends Component<Props> {
  render() {
    const { productIds } = this.props

    return (
      <div className="products-list">
        {productIds.map((id) => {
          return <Product key={id} productId={id} />
        })}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { productIds } = state.products
  return {
    productIds,
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const ProductsList = connector(ProductsListComponent)
