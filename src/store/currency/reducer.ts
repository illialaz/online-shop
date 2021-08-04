import { ChangeCurrencyType, CurrencyActions, SetCurrencyType } from './actions'
import { CHANGE_CURRENCY, SET_CURRENCY } from './types'

type CurrencyState = {
  currency: string
  currencyList: Record<string, { short: string; long: string }>
  currencyNames: string[]
}

const initialState: CurrencyState = {
  currency: 'USD',
  currencyList: {
    USD: {
      short: '$',
      long: '$USD',
    },
  },
  currencyNames: ['USD'],
}

export const reducer = (
  state = initialState,
  action: CurrencyActions
): CurrencyState => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      const { currency } = action as ChangeCurrencyType
      return { ...state, currency }
    case SET_CURRENCY: {
      const { currencyList, currencyNames } = action as SetCurrencyType
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
