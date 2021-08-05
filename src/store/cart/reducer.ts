import { CartItem } from '../../types'
import { AddToCartType, CartActions, ChangeAttributeType } from './actions'
import {
  CHANGE_ATTRIBUTE,
  INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT,
  DELETE_PRODUCT,
  ADD_TO_CART,
} from './types'

type CartState = {
  newId: number
  cartIds: number[]
  cart: Record<number, CartItem>
}

const initialState: CartState = {
  newId: 1,
  cartIds: [],
  cart: {},
}

export const reducer = (
  state = initialState,
  action: CartActions
): CartState => {
  const cartId = (action as ChangeAttributeType)?.cartId || 0

  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        cart: {
          ...state.cart,
          [cartId]: undefined as CartItem,
        },
        cartIds: state.cartIds.filter((value) => value !== cartId),
      }
    case INCREASE_PRODUCT_COUNT:
      return {
        ...state,
        cart: {
          ...state.cart,
          [cartId]: {
            ...state.cart[cartId],
            count: state.cart[cartId].count + 1,
          },
        },
      }
    case DECREASE_PRODUCT_COUNT:
      return {
        ...state,
        cart: {
          ...state.cart,
          [cartId]: {
            ...state.cart[cartId],
            count: state.cart[cartId].count - 1,
          },
        },
      }
    case CHANGE_ATTRIBUTE: {
      const { newAttribute } = action as ChangeAttributeType
      const currentProduct = state.cart[cartId]
      const newAttributes = {
        ...currentProduct.ownAttributes,
        [newAttribute.key]: newAttribute.value,
      }
      const restIds = state.cartIds.filter((id) => id !== cartId)
      const equalProductId = restIds.find((id) => {
        const product = state.cart[id]
        if (product.id !== currentProduct.id) return false
        const isEqualId = product.attributes.reduce(
          (acc, attr) =>
            acc && product.ownAttributes[attr.key] === newAttributes[attr.key],
          true
        )
        return isEqualId
      })

      return {
        ...state,
        cartIds: state.cartIds.filter((id) => id !== equalProductId),
        cart: {
          ...state.cart,
          [cartId]: {
            ...state.cart[cartId],
            ownAttributes: newAttributes,
            count: equalProductId
              ? state.cart[cartId].count + state.cart[equalProductId].count
              : state.cart[cartId].count,
          },
          ...(equalProductId && { [equalProductId]: undefined as CartItem }),
        },
      }
    }

    case ADD_TO_CART:
      const { product } = action as AddToCartType
      const equalProductId = state.cartIds.find((id) => {
        const equalProduct = state.cart[id]
        const isEqualId = equalProduct.attributes.reduce(
          (acc, attr) =>
            acc &&
            equalProduct.ownAttributes[attr.key] ===
              product.ownAttributes[attr.key],
          true
        )
        return isEqualId
      })

      const newId = equalProductId || state.newId

      return {
        ...state,
        cartIds: [...state.cartIds, ...(equalProductId ? [] : [newId])],
        cart: {
          ...state.cart,
          [newId]: {
            ...product,
            count: equalProductId ? state.cart[equalProductId].count + 1 : 1,
          },
        },
        ...(!equalProductId && { newId: state.newId + 1 }),
      }

    default:
      return state
  }
}
