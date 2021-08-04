import { gql } from '@apollo/client'
import { apolloClient } from '../../services/apollo-client'

import { CHANGE_CURRENCY, SET_CURRENCY } from './types'

const currencySymbols = {
  USD: '$',
  GBP: '£',
  AUD: 'A$',
  JPY: '¥',
  RUB: '₽',
}

export const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    currency,
  }
}

const formatData = (data) => {
  const { currencies } = data.data
  const currencyList = currencies.reduce(
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

  return (dispatch) => {
    apolloClient
      .query({
        query: GET_CURRENCY,
      })
      .then((data) => {
        const { currencyNames, currencyList } = formatData(data)
        dispatch(setCurrency({ currencyList, currencyNames }))
      })
  }
}

export const setCurrency = (data) => {
  const { currencyNames, currencyList } = data
  return {
    type: SET_CURRENCY,
    currencyNames,
    currencyList,
  }
}
