import { createGlobalStyle } from 'styled-components'

import variables from './variables'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100vh;
  }

  body {
    background: ${variables.colors.background};
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body,
  input,
  textarea,
  select,
  button {
    font: 400 1.6rem Montserrat;
    color: ${variables.text.common.base};
  }

  .container {
    width: 90vw;
    max-width: 800px;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`

export default GlobalStyle
