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
    case CHANGE_ATTRIBUTE:
      const { newAttribute } = action as ChangeAttributeType
      const { name, value } = newAttribute
      return {
        ...state,
        cart: {
          ...state.cart,
          [cartId]: {
            ...state.cart[cartId],
            ownAttributes: {
              ...state.cart[cartId].ownAttributes,
              [name]: value,
            },
          },
        },
      }

    case ADD_TO_CART:
      const { product } = action as AddToCartType
      return {
        ...state,
        cart: {
          ...state.cart,
          [state.newId]: product,
        },
        cartIds: [...state.cartIds, state.newId],
        newId: state.newId + 1,
      }

    default:
      return state
  }
}
