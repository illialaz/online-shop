import { Component, createRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from 'redux'
import './styles.css'

import cartLogo from '../../../assets/images/cart.svg'
import { handleShowCart } from '../../../store/actions'
import { CartItem } from '../cart-item'
import { RootState } from '../../../store/types'
import { amountSelector, quantitySelector } from '../../../store/cart/selectors'

type Props = PropsFromRedux

type State = {
  showScroll: boolean
}

const padding = 28

class CartComponent extends Component<Props, State> {
  showScroll = false
  cartListHeight = 0
  minicartHeight = 0
  cartBottomHeight = 0
  minicart = createRef<HTMLDivElement>()
  cartList = createRef<HTMLDivElement>()
  cartBottom = createRef<HTMLDivElement>()

  componentDidUpdate = () => {
    this.minicartHeight = this.minicart.current?.offsetHeight || 0
    this.cartListHeight = this.cartList.current?.scrollHeight || 0
    this.cartBottomHeight = this.cartBottom.current?.offsetHeight || 0

    const shouldAddScroll =
      this.minicartHeight - this.cartBottomHeight - padding <
      this.cartListHeight

    if (!this.showScroll && shouldAddScroll) {
      this.showScroll = true
      this.forceUpdate()
    }
    if (this.showScroll && !shouldAddScroll) {
      this.showScroll = false
      this.forceUpdate()
    }
  }

  handleCartClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { handleShowCart } = this.props
    e.stopPropagation()
    handleShowCart()
  }

  handleCartListClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  render = () => {
    const { showCartList, currency, cartIds, total, quantity } = this.props

    const roundedTotal = total.toFixed(2)

    return (
      <div className="cart" onClick={this.handleCartClick}>
        <div className="cart-symbol">
          <img src={cartLogo} alt="Cart" />
          {quantity !== 0 && <div className="cart-counter">{quantity}</div>}
        </div>

        {showCartList && (
          <div className="minicart" ref={this.minicart}>
            <section
              className={'cart-list ' + (this.showScroll ? 'scroll' : '')}
              ref={this.cartList}
              onClick={this.handleCartListClick}
            >
              <div className="">
                <span>My Bag</span>, {cartIds.length || 0} item
                {cartIds.length !== 1 && 's'}
              </div>
              {cartIds.length === 0 && (
                <div className="empty-bag">Your bag is empty</div>
              )}

              {cartIds.map((id) => {
                return <CartItem cartId={id} key={id} />
              })}
            </section>
            <section className="cart-bottom" ref={this.cartBottom}>
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
    total: amountSelector(state),
    quantity: quantitySelector(state),
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
