import { Categories } from '../../types'
import { ChangeCategoryType } from './actions'
import { CHANGE_CATEGORY } from './types'

type CategoriesState = {
  activeCategory: Categories
}

const initialState: CategoriesState = {
  activeCategory: Categories.all,
}

export const reducer = (
  state = initialState,
  action: ChangeCategoryType
): CategoriesState => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return { ...state, activeCategory: action.category }
    default:
      return state
  }
}
