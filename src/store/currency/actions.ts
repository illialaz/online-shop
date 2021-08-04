import { gql } from '@apollo/client'
import { Dispatch } from 'redux'
import { apolloClient } from '../../services/apollo-client'

import { CHANGE_CURRENCY, SET_CURRENCY } from './types'

const currencySymbols: Record<string, string> = {
  USD: '$',
  GBP: '£',
  AUD: 'A$',
  JPY: '¥',
  RUB: '₽',
}

export const changeCurrency = (currency: string) => {
  return {
    type: CHANGE_CURRENCY,
    currency,
  }
}

const formatData = ({ currencies }: { currencies: string[] }) => {
  const currencyList = currencies.reduce<
    Record<string, { short: string; long: string }>
  >(
    (acc, currency) => ({
      ...acc,
      [currency]: {
        short: currencySymbols[currency],
        long: `${currencySymbols[currency]}${currency}`,
      },
    }),
    {}
  )

  return {
    currencyList,
    currencyNames: currencies,
  }
}

export const fetchCurrency = () => {
  const GET_CURRENCY = gql`
    {
      currencies
    }
  `

  return (dispatch: Dispatch) => {
    apolloClient
      .query({
        query: GET_CURRENCY,
      })
      .then(({ data }) => {
        const { currencyNames, currencyList } = formatData(data)
        dispatch(setCurrency({ currencyList, currencyNames }))
      })
  }
}

export const setCurrency = ({
  currencyNames,
  currencyList,
}: {
  currencyNames: string[]
  currencyList: Record<string, { short: string; long: string }>
}) => {
  return {
    type: SET_CURRENCY,
    currencyNames,
    currencyList,
  }
}

export type ChangeCurrencyType = ReturnType<typeof changeCurrency>
export type SetCurrencyType = ReturnType<typeof setCurrency>

export type CurrencyActions = ChangeCurrencyType | SetCurrencyType
