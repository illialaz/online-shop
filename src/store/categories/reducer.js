import { CHANGE_CATEGORY } from './constants'

const initialState = {
  activeCategory: 'all',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return { ...state, activeCategory: action.category }
    default:
      return state
  }
}
