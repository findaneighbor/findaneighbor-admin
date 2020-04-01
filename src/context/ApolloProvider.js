import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth0 } from '../hooks'

export const ApolloContextProvider = ({ className = '', style = {}, children }) => {
  const { apolloClient } = useAuth0()

  return <ApolloProvider client={apolloClient}>
    {children}
  </ApolloProvider>
}
