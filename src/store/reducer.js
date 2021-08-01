import { combineReducers } from 'redux'

import { reducer as cart } from '../components/nav-bar/components/cart/store'
import { reducer as currency_cart } from '../components/nav-bar/components/currency-cart-container/store'
import { reducer as currency } from '../components/nav-bar/components/currency/store'
import { reducer as categories } from '../components/nav-bar/components/categories/store'

export const reducer = combineReducers({
  cart,
  currency,
  currency_cart,
  categories,
})
