import { gql } from '@apollo/client'
import { Dispatch } from 'redux'

import { apolloClient } from '../../services/apollo-client'
import { Attribute, Categories, Product } from '../../types'

import { SET_PRODUCTS, LOADING } from './types'

export const fetchProducts = (category: Categories) => {
  const title = category === Categories.all ? '' : category

  const GET_PRODUCTS = gql`
    query GetProducts($title: String!) {
      category(input: { title: $title }) {
        products {
          id
          name
          brand
          inStock
          gallery
          description
          prices {
            currency
            amount
          }
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
        }
      }
    }
  `

  return (dispatch: Dispatch) => {
    dispatch(isLoading())
    apolloClient
      .query({
        query: GET_PRODUCTS,
        variables: { title },
      })
      .then(({ data }) => {
        const { products, productIds } = formatData(data)
        dispatch(setProducts({ products, productIds }))
      })
  }
}

type ApiAttribute = {
  id: string
  name: string
  type: string
  items: {
    displayValue: string
    value: string
    id: string
  }[]
}

type ApiProduct = {
  id: string
  name: string
  brand: string
  inStock: boolean
  gallery: string[]
  description: string
  prices: {
    currency: string
    amount: number
  }[]
  attributes: ApiAttribute[]
}

type ApiCategory = {
  products: ApiProduct[]
}

type ApiGetProductsResponse = {
  category: ApiCategory
}

const formatData = (response: ApiGetProductsResponse) => {
  const { category } = response
  const { products } = category
  const productIds = products.map((product) => product.id)
  const formatedProducts = products.reduce<Record<string, Product>>(
    (acc, apiProduct) => {
      const product: Product = {
        name: apiProduct.name,
        brand: apiProduct.brand,
        id: apiProduct.id,
        description: apiProduct.description,
        inStock: apiProduct.inStock,
        photoes: apiProduct.gallery,
        attributes: apiProduct.attributes.reduce<Attribute[]>(
          (acc, attribute) => [
            ...acc,
            {
              key: attribute.id,
              value: attribute.items.map((item) => item.value),
              type: attribute.type,
            },
          ],
          []
        ),
        prices: apiProduct.prices.reduce(
          (acc, price) => ({ ...acc, [price.currency]: price.amount }),
          {}
        ),
      }

      return {
        ...acc,
        [apiProduct.id]: product,
      }
    },
    {}
  )

  return {
    productIds,
    products: formatedProducts,
  }
}

export const setProducts = ({
  products,
  productIds,
}: {
  products: Record<string, Product>
  productIds: string[]
}) => {
  return {
    type: SET_PRODUCTS,
    products,
    productIds,
  }
}

export const isLoading = () => {
  return {
    type: LOADING,
  }
}

export type SetProductsAction = ReturnType<typeof setProducts>

export type IsLoadingAction = ReturnType<typeof isLoading>

export type ProductsActions = SetProductsAction | IsLoadingAction
