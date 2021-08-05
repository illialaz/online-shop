import {
  HANDLE_SHOW_CART,
  HANDLE_SHOW_CURRENCY,
  HIDE_CURRENCY_CART,
} from './types'

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

export const hideCurrencyCart = () => {
  return {
    type: HIDE_CURRENCY_CART,
  }
}

export type HandleShowCartType = ReturnType<typeof handleShowCart>
export type HandleShowCurrencyType = ReturnType<typeof handleShowCurrency>
export type HideCurrencyCartType = ReturnType<typeof hideCurrencyCart>

export type CurrencyCartActions =
  | HandleShowCartType
  | HandleShowCurrencyType
  | HideCurrencyCartType
