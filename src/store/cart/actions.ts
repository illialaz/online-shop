import { CartItem } from '../../types'
import {
  CHANGE_ATTRIBUTE,
  INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT,
  DELETE_PRODUCT,
  ADD_TO_CART,
} from './types'

export const changeAttribute = ({
  newAttribute,
  cartId,
}: {
  newAttribute: { key: string; value: string }
  cartId: number
}) => {
  return {
    type: CHANGE_ATTRIBUTE,
    newAttribute,
    cartId,
  }
}

export const increaseProductCount = (cartId: number) => {
  return {
    type: INCREASE_PRODUCT_COUNT,
    cartId,
  }
}

export const decreaseProductCount = (cartId: number) => {
  return {
    type: DECREASE_PRODUCT_COUNT,
    cartId,
  }
}

export const deleteProduct = (cartId: number) => {
  return {
    type: DELETE_PRODUCT,
    cartId,
  }
}

export const addToCart = (product: CartItem) => {
  return {
    type: ADD_TO_CART,
    product,
  }
}

export type ChangeAttributeType = ReturnType<typeof changeAttribute>
export type IncreaseProductCountType = ReturnType<typeof increaseProductCount>
export type DecreaseProductCountType = ReturnType<typeof decreaseProductCount>
export type DeleteProductType = ReturnType<typeof deleteProduct>
export type AddToCartType = ReturnType<typeof addToCart>

export type CartActions =
  | AddToCartType
  | ChangeAttributeType
  | IncreaseProductCountType
  | DecreaseProductCountType
  | DeleteProductType
