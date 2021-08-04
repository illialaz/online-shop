import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import './styles.css'

import { CartItem } from '../cart-item'
import { RootState } from '../../../../store/types'

type Props = PropsFromRedux

class CartListComponent extends Component<Props> {
  render() {
    const { cartIds } = this.props
    return (
      <ul className="cart-list">
        {cartIds.map((id) => (
          <CartItem key={id} cartId={id} />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { cartIds } = state.cart
  return {
    cartIds,
  }
}

const connector = connect(mapStateToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const CartList = connector(CartListComponent)
