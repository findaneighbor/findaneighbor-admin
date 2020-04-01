import React from 'react'
import { render } from 'react-dom'
import { App } from './sections'
import { Auth0Provider } from './context'
import { BrowserRouter } from 'react-router-dom'
import { ApolloContextProvider } from './context/ApolloProvider'


render(
  <BrowserRouter>
    <Auth0Provider
      domain='findaneighbor.auth0.com'
      client_id='V7kGY6oKqSovAyj7vhFmvyZEzsKIw4SJ'
      redirect_uri={window.location.origin}
      scope='openid email profile'
      audience='findaneighbor'
    >
      <ApolloContextProvider>
        <App />
      </ApolloContextProvider>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('app')
)
