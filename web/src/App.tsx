import React from 'react';

import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import AuthProvider from './contexts/auth'
import GlobalStyle from './assets/styles/globalStyles';

import theme from './assets/styles/theme';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;
