interface IState {
  nome: string
  sigla: string
}

interface ICity {
  nome: string
}
interface ISelectedLocation {
  state: string
  city: string
}

export {
  IState,
  ICity,
  ISelectedLocation
}
