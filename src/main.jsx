import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(

  <Auth0Provider
    domain="dev-3lx10lvlyun7rcar.us.auth0.com"
    clientId="iR0KYyg9YuZUb2PU8Cln9fgjtlOeJy7w"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
)
