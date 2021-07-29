import { CHANGE_CATEGORY, CHANGE_CURRENCY } from './constants'

const initialState = {
  products: [],
  loading: true,
  cartList: ['a', 'b', 'c'],
  activeCategory: 'all',
  currency: 'USD',
  currencyList: ['USD', 'EUR', 'RUB'],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return { ...state, activeCategory: action.category }
    case CHANGE_CURRENCY:
      return { ...state, currency: action.currency }
    default:
      return state
  }
}
