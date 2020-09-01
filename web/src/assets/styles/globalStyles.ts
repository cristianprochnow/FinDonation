import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 72%;
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
    background: ${props => props.theme.colors.background};
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
    color: ${props => props.theme.text.common.base};
  }

  .container {
    width: 90vw;
    max-width: 800px;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 80%;
    }
  }
`

export default GlobalStyle
