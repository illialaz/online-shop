import {
  HANDLE_SHOW_CART,
  HANDLE_SHOW_CURRENCY,
  HIDE_CURRENCY_CART,
} from './types'
import { CurrencyCartActions } from './actions'

type CurrencyCartState = {
  showCurrencyList: boolean
  showCartList: boolean
}

const initialState: CurrencyCartState = {
  showCurrencyList: false,
  showCartList: false,
}

export const reducer = (
  state = initialState,
  action: CurrencyCartActions
): CurrencyCartState => {
  switch (action.type) {
    case HANDLE_SHOW_CART:
      return {
        ...state,
        showCurrencyList:
          state.showCartList === false ? false : state.showCurrencyList,
        showCartList: !state.showCartList,
      }
    case HANDLE_SHOW_CURRENCY:
      return {
        ...state,
        showCartList:
          state.showCurrencyList === false ? false : state.showCartList,
        showCurrencyList: !state.showCurrencyList,
      }
    case HIDE_CURRENCY_CART:
      return {
        ...state,
        showCartList: false,
        showCurrencyList: false,
      }
    default:
      return state
  }
}
