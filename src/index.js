import React from 'react'
import { render } from 'react-dom'
import { App } from './sections'
import { Auth0Provider } from './context'
import { BrowserRouter } from 'react-router-dom'
import { ApolloContextProvider } from './context/ApolloProvider'

if (process.env.NODE_ENV === 'development') {
  document.title = 'Local | Find A Neighbor | Admin'
}

const auth0ClientSettings = process.env.NODE_ENV === 'development'
  ? {
    domain: 'findaneighbor-dev.auth0.com',
    client_id: '50ctBEqu45Y3puh17DGDJKmcMpQu5vKt',
    redirect_uri: window.location.origin,
    scope: 'openid email profile',
    audience: 'findaneighbor-dev',
    leeway: 60
  }
  : {
    domain: 'findaneighbor.auth0.com',
    client_id: 'V7kGY6oKqSovAyj7vhFmvyZEzsKIw4SJ',
    redirect_uri: window.location.origin,
    scope: 'openid email profile',
    audience: 'findaneighbor',
    leeway: 60
  }

render(
  <BrowserRouter>
    <Auth0Provider {...auth0ClientSettings}>
      <ApolloContextProvider>
        <App />
      </ApolloContextProvider>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('app')
)
