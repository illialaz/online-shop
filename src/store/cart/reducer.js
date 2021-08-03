import {
  CHANGE_ATTRIBUTE,
  INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT,
  DELETE_PRODUCT,
  ADD_TO_CART,
} from './constants'

const initialState = {
  newId: 1,
  cartIds: [],
  cart: {},
}

export const reducer = (state = initialState, action) => {
  const { cart, cartIds } = state

  switch (action.type) {
    case DELETE_PRODUCT:
      const tempCart = { ...cart }
      delete tempCart[action.cartId]
      return {
        ...state,
        cart: tempCart,
        cartIds: cartIds.filter((value) => value !== action.cartId),
      }
    case INCREASE_PRODUCT_COUNT:
      return {
        ...state,
        cart: {
          ...cart,
          [action.cartId]: {
            ...cart[action.cartId],
            count: cart[action.cartId].count + 1,
          },
        },
      }
    case DECREASE_PRODUCT_COUNT:
      return {
        ...state,
        cart: {
          ...cart,
          [action.cartId]: {
            ...cart[action.cartId],
            count: cart[action.cartId].count - 1,
          },
        },
      }
    case CHANGE_ATTRIBUTE:
      const { name, value, cartId } = action.newAttribute
      return {
        ...state,
        cart: {
          ...cart,
          [cartId]: {
            ...cart[cartId],
            ownAttributes: {
              ...cart[cartId].ownAttributes,
              [name]: value,
            },
          },
        },
      }

    case ADD_TO_CART:
      const {
        name: productName,
        prices,
        photoes,
        attributes,
        ownAttributes,
      } = action.product
      return {
        ...state,
        cart: {
          ...cart,
          [state.newId]: {
            name: productName,
            prices,
            photoes,
            attributes,
            ownAttributes,
            count: 1,
          },
        },
        cartIds: [...cartIds, state.newId],
        newId: state.newId + 1,
      }

    default:
      return state
  }
}
