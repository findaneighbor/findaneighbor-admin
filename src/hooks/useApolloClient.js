import { useState } from 'react'
import { ApolloClient, InMemoryCache, split, HttpLink } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const cache = new InMemoryCache()

const createClient = token => {
  // Create an http link:
  const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === 'production'
      ? 'https://stunning-mammal-89.hasura.app/v1/graphql'
      : 'http://localhost:8080/v1/graphql',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: process.env.NODE_ENV === 'production'
      ? `wss://stunning-mammal-89.hasura.app/v1/graphql`
      : `ws://localhost:8080/v1/graphql`,
    options: {
      reconnect: !!token,
      connectionParams: () => ({
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      lazy: true
    }
  })

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)

      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  return new ApolloClient({
    link: link,
    cache,
    resolvers: {}
  })
}

const firstClient = createClient('')

firstClient.writeData({
  data: {
    authToken: ''
  }
})

export const useApolloClient = () => {
  const [client, setClient] = useState(firstClient)

  return [client, newToken => {
    const newClient = createClient(newToken)

    newClient.writeData({
      data: {
        authToken: newToken
      }
    })

    return setClient(newClient)
  }]
}
