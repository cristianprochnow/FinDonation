import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    background: '#F0F0F5',
    inBackground: '#FFF',
    primary: '#5B4FDB',
    secondary: '#746AE5',
    black: {
      200: 'rgba(0, 0, 0, 0.2)'
    }
  },
  text: {
    common: {
      base: '#665F5C',
      inButton: '#FFF',
      primary: '#5B4FDB',
      inPrimary: '#FFF'
    },
    title: {
      base: '#403940',
      primary: '#5B4FDB',
      inPrimary: '#FFF'
    }
  },
  card: {
    background: '#d6d6d6',
    backgroundSelected: '#BDA2E9',
    border: '#ababab',
    borderSelected: '#5B4FDB'
  },
  time: {
    transitionButton: '0.3s'
  }
}

export default theme
