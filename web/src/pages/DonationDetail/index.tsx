import React, { useEffect, useState } from 'react'
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
import { api } from '../../services/api'
import { useHistory, useParams } from 'react-router-dom'
import CategoryCard from '../../components/CategoryCard'
import { CardContainer } from '../../pages/Donations/styles'

interface Donation {
  id: string
  title: string
  description: string
  uf: string
  city: string
  neighbourhood: string
  street: string
  number: string
  latitude: number
  longitude: number
  image_url: string
  categories: string
}

interface Card {
  id: number
  title: string
  icon_url: string
}

const DonationDetail: React.FC = () => {
  const { uuid } = useParams()
  const history = useHistory()
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState([])
  const [donation, setDonation] = useState({
    id: '',
    title: '',
    description: '',
    uf: '',
    city: '',
    neighbourhood: '',
    street: '',
    number: '',
    latitude: 0,
    longitude: 0,
    image_url: '',
    categories: [],
  })
  const donationAddress = `Rua ${donation.street}, ${donation.number}. ${donation.neighbourhood}, ${donation.city} - ${donation.uf}.`

  function isCardSelected(cardId: number, selectedCards: number[]) {
    let isCardSelected = selectedCards.includes(cardId)

    if (isCardSelected) {
      return true
    } else {
      return false
    }
  }

  // fetch donation data by donation uuid
  useEffect(() => {
    api.get(
      `/donations/details/${uuid}`
    ).then(({ data }) => {
      setDonation(data)
    }).catch(error => {
      console.log(`[Donation details] > ${error}`)
      alert('😥 Ooops... Não conseguimos as informações desta doação no momento. Por favor, tente novamente mais tarde.')

      history.goBack()
    })
  }, [history, uuid])

  // fetch cards for categories of each donation
  useEffect(() => {
    api.get('/items')
      .then(({ data }) => setCards(data))
      .catch(error => { console.log(`[items] > ${error}`) })
  }, [])

  useEffect(() => {
    setSelectedCards(donation.categories)
  }, [donation.categories])

  return (
    <div id="donation-detail-page">
      <Header />

      <main id="container">
        <header>
          <img src={donation.image_url} alt={donation.title} />

          <Title>{donation.title}</Title>
          <Description>{donation.description}</Description>
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

        <section className="fieldset" id="localization">
          <SubTitle>Localização</SubTitle>

          <div id="map">
            <Map
              style={{
                width: '100%',
                height: '100%',
                zIndex: 5
              }}
              zoom={15}
              center={[donation.latitude, donation.longitude]}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <Marker
                position={[donation.latitude, donation.longitude]}
                icon={mapMarker}
              />
            </Map>

            <span>
              <strong>{donationAddress}</strong>
            </span>
          </div>
        </section>

        <section className="fieldset">
          <SubTitle>Categoria da doação</SubTitle>

          <CardContainer>
            { cards.map(card => (
              <CategoryCard
                key={card.id}
                label={card.title}
                iconUrl={card.icon_url}
                isCardSelected={isCardSelected(card.id, selectedCards) ? true : false}
                style={{ cursor: 'default' }}
              />
            )) }
          </CardContainer>
        </section>
      </main>
    </div>
  )
}

export default DonationDetail
