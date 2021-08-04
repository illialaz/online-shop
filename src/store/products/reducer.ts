import { Product } from '../../types'
import { SET_PRODUCTS, LOADING } from './types'
import { ProductsActions, SetProductsAction } from './actions'

type ProductsState = {
  productIds: string[]
  products: Record<string, Product>
  loading: boolean
}

const initialState: ProductsState = {
  productIds: [],
  products: {},
  loading: true,
}

export const reducer = (
  state = initialState,
  action: ProductsActions
): ProductsState => {
  switch (action.type) {
    case SET_PRODUCTS:
      const { products, productIds } = action as SetProductsAction
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
