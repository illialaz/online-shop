import { CHANGE_CURRENCY, SET_CURRENCY } from './types'

const initialState = {
  currency: 'USD',
  currencyList: {
    USD: {
      short: '$',
      long: '$USD',
    },
  },
  currencyNames: ['USD'],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return { ...state, currency: action.currency }
    case SET_CURRENCY: {
      const { currencyList, currencyNames } = action
      return {
        ...state,
        currencyList,
        currencyNames,
      }
    }
    default:
      return state
  }
}
