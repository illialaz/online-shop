import { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import './styles.css'

import cartLogo from '../../../assets/images/cart.svg'
import { handleShowCart } from '../../../store/actions'
import { CartItem } from '../cart-item'
import { RootState } from '../../../store/types'

type Props = PropsFromRedux

class CartComponent extends Component<Props> {
  render = () => {
    const {
      cart,
      showCartList,
      currency,
      currencyName,
      handleShowCart,
      cartIds,
    } = this.props
    const total = cartIds.reduce((total, id) => {
      return total + cart[id].prices[currencyName] * cart[id].count
    }, 0)
    const roundedTotal = total.toFixed(2)
    return (
      <div className="cart" onClick={handleShowCart}>
        <div className="cart-symbol">
          <img src={cartLogo} alt="Cart" />
          {cartIds.length !== 0 && (
            <div className="cart-counter">{cartIds.length}</div>
          )}
        </div>

        {showCartList && (
          <div className="minicart">
            <section className="cart-list" onClick={(e) => e.stopPropagation()}>
              <div className="">
                <span>My Bag</span>, {cartIds.length || 0} item
                {cartIds.length !== 1 && 's'}
              </div>
              {cartIds.length === 0 && (
                <div className="empty-bag">Your bag is empty</div>
              )}
              <ul>
                {cartIds.map((id) => {
                  return <CartItem cartId={id} key={id} />
                })}
              </ul>
            </section>
            <section className="cart-bottom">
              <div className="total">
                <span>total</span>
                <div className="price">
                  {currency}
                  {roundedTotal}
                </div>
              </div>
              <div className="buttons">
                <Link to="/cart">
                  <button type="button" className="view-bag">
                    view bag
                  </button>
                </Link>

                <Link to="/cart">
                  <button type="button" className="check-out">
                    check out
                  </button>
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  const { cart, cartIds } = state.cart
  const { showCartList } = state.currencyCart
  const { currency, currencyList } = state.currency
  return {
    cart,
    cartIds,
    showCartList,
    currency: currencyList[currency].short,
    currencyName: currency,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleShowCart: () => dispatch(handleShowCart()),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export const Cart = connector(CartComponent)
