import {
  CHANGE_CATEGORY,
  CHANGE_CURRENCY,
  CHANGE_SHOW_CART,
  CHANGE_SHOW_CURRENCY,
} from './constants'

export const changeCategory = ({ category }) => {
  return {
    type: CHANGE_CATEGORY,
    category,
  }
}

export const changeCurrency = ({ currency }) => {
  return {
    type: CHANGE_CURRENCY,
    currency,
  }
}

export const changeShowCurrency = ({ showCurrency }) => {
  return {
    type: CHANGE_SHOW_CURRENCY,
    showCurrency,
  }
}

export const changeShowCart = ({ showCart }) => {
  return {
    type: CHANGE_SHOW_CART,
    showCart,
  }
}
