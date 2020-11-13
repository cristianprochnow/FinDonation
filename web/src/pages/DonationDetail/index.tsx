import React, { useState } from 'react'
import './styles.css'
import { Map, TileLayer, Marker } from 'react-leaflet'
import Header from '../../components/Header'
import Title from '../../components/Title'
import SubTitle from '../../components/SubTitle'
import Description from '../../components/Description'
import image from '../../assets/images/image.jpg'
import ButtonWithIcon from '../../components/ButtonWithIcon'
import mapMarker from '../../utils/mapMarker'
import {
  RiWhatsappLine,
  RiMailLine
} from 'react-icons/ri'

const DonationDetail: React.FC = () => {
  const [position, setPosition] = useState({
    latitude: -26.4479106,
    longitude: -48.6288651
  })

  return (
    <div id="donation-detail-page">
      <Header />

      <main id="container">
        <header>
          <img src={image} alt="Sofá de camurça"/>

          <Title>Sofá de camurça</Title>
          <Description>
            Um simples sofá. Bonito, charmoso, cheiroso e gostoso.
            Tudo de melhor para o seu conforto e o de sua família.
          </Description>
        </header>

        <section id="contact">
          <ButtonWithIcon
            label="Whatsapp"
            Icon={RiWhatsappLine}
            className="whatsapp"
          />

          <ButtonWithIcon
            label="E-mail"
            Icon={RiMailLine}
            className="email"
          />
        </section>

        <span id="ong">
          <img src={image} alt="Exército da Salvação"/>
          <strong>Exército da Salvação</strong>
        </span>

        <section id="localization">
          <SubTitle>Localização</SubTitle>

          <div id="map">
            <Map
              style={{
                width: '100%',
                height: '100%',
                zIndex: 5
              }}
              zoom={15}
              center={[position.latitude, position.longitude]}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <Marker
                position={[position.latitude, position.longitude]}
                icon={mapMarker}
              />
            </Map>

            <span>
              <strong>
                Rua Ernesto Pereira, Nº 1963. Centro, Camboriú - SC.
              </strong>
            </span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DonationDetail
