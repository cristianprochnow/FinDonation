import React, { useState, useEffect, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './styles.css'

import logoWithLabelImg from '../../assets/images/logos/findonation-with-label.svg'

import Select from '../../components/Select'
import ActionButton from '../../components/ActionButton'

import { ISelectedLocation, IState, ICity } from './types'

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
            <Select
              name="state"
              label="UF"
              onChange={handleSetLocation}
            >
              { states.map((state: IState) => (
                <option
                  key={state.sigla}
                  value={state.sigla}
                >{state.nome}</option>
              )) }
            </Select>

            <Select
              name="city"
              label="Cidade"
              disabled={selectedLocation.state ? false : true}
              onChange={handleSetLocation}
            >
              { cities.map((city: ICity) => (
                <option
                  key={city.nome}
                  value={city.nome}
                >{city.nome}</option>
              )) }
            </Select>

            <ActionButton
              label="Buscar"
              isActive={Boolean(selectedLocation.state && selectedLocation.city)}
            />
          </form>
        </div>
      </article>
    </main>
  )
}

export default Home
