import { Categories } from '../../types'
import { CHANGE_CATEGORY } from './types'

export const changeCategory = (category: Categories) => {
  return {
    type: CHANGE_CATEGORY,
    category,
  }
}

export type ChangeCategoryType = ReturnType<typeof changeCategory>
