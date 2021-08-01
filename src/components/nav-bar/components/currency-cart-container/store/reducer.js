import { HANDLE_SHOW_CART, HANDLE_SHOW_CURRENCY } from './constants'

const initialState = {
  showCurrencyList: false,
  showCartList: false,
}

export const reducer = (state = initialState, action) => {
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
    default:
      return state
  }
}
