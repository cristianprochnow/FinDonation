import React from 'react'
import * as dotenv from 'dotenv'

import Routes from './routes'
import AuthProvider from './contexts/auth'
import GlobalStyle from './assets/styles/globalStyles'
import 'leaflet/dist/leaflet.css'

dotenv.config()

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  )
}

export default App;
