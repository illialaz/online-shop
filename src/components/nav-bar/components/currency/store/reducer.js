import { CHANGE_CURRENCY } from './constants'

const initialState = {
  currency: 'USD',
  currencyList: {
    USD: {
      short: '$',
      long: '$USD',
    },
    GPB: {
      short: '£',
      long: '£GPB',
    },
    AUD: {
      short: 'A$',
      long: '$AUD',
    },
    JPY: {
      short: '¥',
      long: '¥JPY',
    },
    RUB: {
      short: '₽',
      long: '₽RUB',
    },
  },
  currencyNames: ['USD', 'GPB', 'AUD', 'JPY', 'RUB'],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return { ...state, currency: action.currency }
    default:
      return state
  }
}
