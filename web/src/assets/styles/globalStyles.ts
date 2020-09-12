import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --color-background: #F0F0F5;
    --color-in-background: #FFF;
    --color-primary: #5B4FDB;
    --color-secondary: #746AE5;
    --color-black-200: rgba(0, 0, 0, 0.2);
    --color-text-base: #665F5C;
    --color-text-in-button: #FFF;
    --color-text-primary: #5B4FDB;
    --color-text-in-primary: #FFF;
    --color-title-base: #403940;
    --color-title-primary: #5B4FDB;
    --color-title-in-primary: #FFF;
    --color-card-background: #d6d6d6;
    --color-card-background-selected: #BDA2E9;
    --color-card-border: #ABABAB;
    --color-card-border-selected: #5B4FDB;

    --opacity-800: 0.8;
    --opacity-900: 0.9;

    --time-transition-button: .3s;
    --time-transition-link: .2s;

    font-size: 64%;
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
  select {
    font: 400 1.6rem Montserrat;
    color: ${props => props.theme.text.common.base};
  }

  button {
    font: 700 1.6rem Montserrat;
    color: ${props => props.theme.text.common.base};
  }

  @media (min-width: 769px) {
    :root {
      font-size: 72%;
    }
  }
`

export default GlobalStyle
