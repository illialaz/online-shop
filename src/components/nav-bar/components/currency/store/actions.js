import { CHANGE_CURRENCY } from './constants'

export const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    currency,
  }
}
