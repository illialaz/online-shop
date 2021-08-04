import { SET_PRODUCTS, LOADING } from './types'

const initialState = {
  productIds: [],
  products: {},
  loading: true,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      const { products, productIds } = action
      return {
        ...state,
        products,
        productIds,
        loading: false,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
