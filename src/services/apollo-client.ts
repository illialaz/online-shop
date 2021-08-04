import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})
