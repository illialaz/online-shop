import { combineReducers } from 'redux'

import { reducer as cart } from './cart'
import { reducer as currencyCart } from './currency-cart'
import { reducer as currency } from './currency'
import { reducer as categories } from './categories'
import { reducer as products } from './products'

export const reducer = combineReducers({
  cart,
  currency,
  currencyCart,
  categories,
  products,
})
