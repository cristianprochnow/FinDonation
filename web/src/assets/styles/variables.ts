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
}

interface ITime {
  transitionButton: string
}

interface IVariables {
  colors: IColors
  text: IText
  time: ITime
  card: ICard
}

const variables: IVariables = {
  colors: {
    background: '#F0F0F5',
    primary: '#5B4FDB'
  },
  text: {
    common: {
      base: '#665F5C',
      inButton: '#FFF',
      inPrimary: '#FFF'
    },
    title: {
      base: '#403940',
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

export default variables
