import { HANDLE_SHOW_CART, HANDLE_SHOW_CURRENCY } from './types'

export const handleShowCart = () => {
  return {
    type: HANDLE_SHOW_CART,
  }
}

export const handleShowCurrency = () => {
  return {
    type: HANDLE_SHOW_CURRENCY,
  }
}
