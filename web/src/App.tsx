import React from 'react'

import Routes from './routes'
import AuthProvider from './contexts/auth'
import GlobalStyle from './assets/styles/globalStyles'

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Routes />
    </AuthProvider>
  )
}

export default App;
