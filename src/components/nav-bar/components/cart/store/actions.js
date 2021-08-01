import {
  CHANGE_ATTRIBUTE,
  INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT,
} from './constants'

export const changeAttribute = (newAttribute) => {
  return {
    type: CHANGE_ATTRIBUTE,
    newAttribute,
  }
}

export const increaseProductCount = (cartId) => {
  return {
    type: INCREASE_PRODUCT_COUNT,
    cartId,
  }
}

export const decreaseProductCount = (cartId) => {
  return {
    type: DECREASE_PRODUCT_COUNT,
    cartId,
  }
}
