import React from 'react'

import './styles.css'

import logoWithLabelImg from '../../assets/images/logos/findonation-with-label.svg'

const Home: React.FC = () => {
  return (
    <main id="page-home">
      <article id="page-home-search">
        <header>
          <img src={logoWithLabelImg} alt="FinDonation"/>

          <div id="link-block">
            <a href="">Cadastrar um ONG</a>
            <a href="">Doar</a>
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
              <select defaultValue="" name="state" id="state">
                <option value="" disabled hidden>Selecione seu estado</option>
              </select>
            </div>

            <div className="select-block">
              <label htmlFor="city">Cidade</label>
              <select defaultValue="" name="city" id="city">
                <option value="" disabled hidden>Selecione sua cidade</option>
              </select>
            </div>

            <button type="submit">
              Buscar
            </button>
          </form>
        </div>
      </article>
    </main>
  )
}

export default Home
