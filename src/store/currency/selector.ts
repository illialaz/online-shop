import { createSelector } from 'reselect'
import { RootState } from '../types'

const cartState = (state: RootState) => state.currency

export const currencySelector = createSelector(
  cartState,
  (currency) => currency.currency
)
