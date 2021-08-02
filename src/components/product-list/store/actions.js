import { client } from './index'
import { gql } from '@apollo/client'

import { SET_PRODUCTS, LOADING } from './constants'

export const fetchProducts = (category) => {
  const title = category === 'all' ? '' : category

  const GET_PRODUCTS = gql`
    query GetProducts($title: String!) {
      category(input: { title: $title }) {
        products {
          id
          name
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

  return (dispatch) => {
    dispatch(isLoading())
    client
      .query({
        query: GET_PRODUCTS,
        variables: { title },
      })
      .then((data) => {
        const { products, productIds } = formatData(data)
        dispatch(setProducts({ products, productIds }))
      })
  }
}

const formatData = (data) => {
  const { products } = data.data.category
  const productIds = products.map((product) => product.id)
  const formatedProducts = products.reduce(
    (acc, product) => ({
      ...acc,
      [product.id]: {
        name: product.name,
        description: product.description,
        inStock: product.inStock,
        photoes: product.gallery,
        attributes: product.attributes.reduce(
          (acc, attribute) => [
            ...acc,
            {
              key: attribute.id,
              value: attribute.items.map((item) => item.value),
            },
          ],
          []
        ),
        prices: product.prices.reduce(
          (acc, price) => ({ ...acc, [price.currency]: price.amount }),
          {}
        ),
      },
    }),
    {}
  )
  return {
    productIds,
    products: formatedProducts,
  }
}

export const setProducts = (data) => {
  const { products, productIds } = data
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
