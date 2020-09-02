import 'styled-components'

interface IText {
  common: {
    base: string
    inButton: string
    inPrimary: string
  },
  title: {
    base: string
    inPrimary: string
  }
}

interface ICard {
  background: string
  backgroundSelected: string
  border: string
  borderSelected: string
}

interface IColors {
  primary: string
  background: string
  secondary: string
  black: {
    200: string
  }
}

interface ITime {
  transitionButton: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: IColors
    text: IText
    time: ITime
    card: ICard
  }
}
