import { CHANGE_CATEGORY } from './types'

export const changeCategory = (category) => {
  return {
    type: CHANGE_CATEGORY,
    category,
  }
}
