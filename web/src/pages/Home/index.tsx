import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './styles.css'

import logoWithLabelImg from '../../assets/images/logos/findonation-with-label.svg'

interface IState {
  sigla: string
  nome: string
}

interface ICity {
  nome: string
}

interface ISelectedLocation {
  state: string
  city: string
}

const Home: React.FC = () => {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [selectedLocation, setSelectedLocation] = useState<ISelectedLocation>({
    state: '',
    city: ''
  })

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => setStates(response.data))
  }, [])

  useEffect(() => {
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedLocation.state}/municipios`)
      .then(response => setCities(response.data))
  }, [selectedLocation.state])

  function handleSetLocation(event: ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = event.target

    setSelectedLocation({
      ...selectedLocation,
      [name]: value
    })

    console.log(selectedLocation)
  }

  return (
    <main id="page-home">
      <article id="page-home-search">
        <header>
          <img src={logoWithLabelImg} alt="FinDonation"/>

          <div id="link-block">
            <Link to="/ong/signup">Cadastrar um ONG</Link>
            <Link to="/donation/register">Doar</Link>
          </div>
        </header>

        <div id="page-home-search-content" className="container">
          <h1>Encontre, comunique e doe.</h1>
          <p>
            Ajudamos você a doar algo que deseje,
            encontrar alguém que queira doar,
            e achar ONGs que precisam de sua ajuda.
          </p>

          <form id="search-form">
            <div className="select-block">
              <label htmlFor="state">UF</label>
              <select
                defaultValue=""
                name="state"
                id="state"
                onChange={handleSetLocation}
              >
                <option value="" disabled hidden>Selecione seu estado</option>

                { states.map((state: IState) => (
                  <option
                    key={state.sigla}
                    value={state.sigla}
                  >{state.nome}</option>
                )) }
              </select>
            </div>

            <div className="select-block">
              <label htmlFor="city">Cidade</label>
              <select
                defaultValue=""
                name="city"
                id="city"
                disabled={selectedLocation.state ? false : true}
                onChange={handleSetLocation}
              >
                <option value="" disabled hidden>Selecione sua cidade</option>

                { cities.map((city: ICity) => (
                  <option
                    key={city.nome}
                    value={city.nome}
                  >{city.nome}</option>
                )) }
              </select>
            </div>

            <button
              type="submit"
              disabled={selectedLocation.state && selectedLocation.city ? false : true}
            >
              Buscar
            </button>
          </form>
        </div>
      </article>
    </main>
  )
}

export default Home
