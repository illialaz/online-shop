import { CHANGE_CATEGORY } from './constants'

export const changeCategory = (category) => {
  return {
    type: CHANGE_CATEGORY,
    category,
  }
}
