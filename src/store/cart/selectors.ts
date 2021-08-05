import { createSelector } from 'reselect'
import { currencySelector } from '../currency/selector'
import { RootState } from '../types'

const cartState = (state: RootState) => state.cart

export const cartIdsSelector = createSelector(cartState, (cart) => cart.cartIds)

export const cartSelector = createSelector(cartState, (cart) => cart.cart)

export const amountSelector = createSelector(
  cartIdsSelector,
  cartSelector,
  currencySelector,
  (cartIds, cart, currency) => {
    return cartIds.reduce((acc, id) => {
      return acc + cart[id].prices[currency]
    }, 0)
  }
)

export const quantitySelector = createSelector(
  cartIdsSelector,
  cartSelector,
  (cartIds, cart) => {
    return cartIds.reduce((acc, id) => {
      return acc + cart[id].count
    }, 0)
  }
)
