import {
  CHANGE_ATTRIBUTE,
  INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT,
  DELETE_PRODUCT,
  ADD_TO_CART,
} from './types'

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

export const deleteProduct = (cartId) => {
  return {
    type: DELETE_PRODUCT,
    cartId,
  }
}

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product,
  }
}
