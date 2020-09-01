import React from 'react';

import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import GlobalStyle from './assets/styles/globalStyles';

import theme from './assets/styles/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </>
  )
}

export default App;
