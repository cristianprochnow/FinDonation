import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import {
  Container,
  SignUpForm,
  MapContainer,
  MapDescription,
  MapDescriptionText,
  InputGroup2x2,
  InputGroup2x3x2
} from './styles'
import Title from '../../components/Title'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Dropzone from '../../components/Dropzone'
import Textarea from '../../components/Textarea'
import Fieldset from '../../components/Fieldset'
import Button from '../../components/Button'
import Select from '../../components/Select'
import { CardContainer } from '../Donations/styles'
import CategoryCard from '../../components/CategoryCard'
import mapMarker from '../../utils/mapMarker'
import { api } from '../../services/api'
import { useAuth } from '../../contexts/auth'
import { useHistory, useParams } from 'react-router-dom'

interface State {
  nome: string
  sigla: string
}

interface City {
  nome: string
}

interface Card {
  id: number
  title: string
  icon_url: string
}

interface Donation {
  title: string
  description: string
  uf: string
  city: string
  neighbourhood: string
  street: string
  number: string
  latitude: number
  longitude: number
  categories: number[]
}

const DonationUpdate: React.FC = () => {
  const history = useHistory()
  const { uuid } = useParams()
  const { user } = useAuth()
  const [avatar, setAvatar] = useState<File|null>(null)
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [ufs, setUfs] = useState<State[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedUf, setSelectedUf] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [initialPosition, setInitialPosition] = useState({ latitude: 0, longitude: 0 })
  const [inputFormData, setInputFormData] = useState({
    title: '',
    description: '',
    neighbourhood: '',
    street: '',
    number: ''
  })
  const [categories, setCategories] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<number[]>([])

  function handleSetPosition(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  function handleChangeFormData(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target

    setInputFormData({
      ...inputFormData,
      [name]: value
    })
  }

  function handleSelectCard(cardId: number) {
    const isSelectedCard = selectedCards.includes(cardId)

    if (isSelectedCard) {
      let arrayWithRemovedCard = selectedCards.filter(card => card !== cardId)

      setSelectedCards(arrayWithRemovedCard)
    } else {
      let arrayWithNewCard = [...selectedCards, cardId]

      setSelectedCards(arrayWithNewCard)
    }
  }

  function isCardSelected(cardId: number, selectedCards: number[]) {
    let isCardSelected = selectedCards.includes(cardId)

    if (isCardSelected) {
      return true
    } else {
      return false
    }
  }

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault()

    const {
      description,
      title,
      neighbourhood,
      number,
      street
    } = inputFormData
    const {
      latitude,
      longitude
    } = position

    const selectedCardsAsString = categories.join(',')

    const formData = new FormData()

    formData.append('title', title)
    formData.append('description', description)
    formData.append('uf', selectedUf)
    formData.append('city', selectedCity)
    formData.append('neighbourhood', neighbourhood)
    formData.append('street', street)
    formData.append('number', number)
    formData.append('latitude', String(latitude))
    formData.append('longitude', String(longitude))
    formData.append('categories', selectedCardsAsString)
    formData.append('image', avatar as Blob)

    try {
      await api.put(
        `/donations/update/${uuid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': user?.token
          }
        }
      )

      alert('🎉 Doação atualizada com sucesso!')

      history.goBack()
    } catch (error) {
      alert(`😥 Ooops... Ocorreu algo inesperado durante a edição dos dados, por favor, tente novamente novamente mais tarde`)

      console.log(`[update data] > ${error}`)
    }
  }

  // fetch states from Brazil, using IBGE api
  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(({ data }) => {
        setUfs(data)
      })
      .catch(error => {
        console.log(`[ufs] > ${error}`)
      })
  }, [])

  // fetch cities from Brazil, using IBGE api
  useEffect(() => {
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(({ data }) => {
        setCities(data)
      })
      .catch(error => {
        console.log(`[cities] > ${error}`)
      })
  }, [selectedUf])

  // pick user's location using "geolocation" api
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        setInitialPosition({
          latitude,
          longitude
        })
      },
      error => {
        console.log(`[user's location] > ${error}`)
      }
    )
  }, [])

  // fetch data for cards of items' categories
  useEffect(() => {
    api.get('/items')
      .then(({ data }) => {
        setCategories(data)
      })
      .catch(error => {
        console.log(`[items] > ${error}`)
      })
  }, [])

  // fetch donation data by donation id from url param
  useEffect(() => {
    api.get(
      `/donations/details/${uuid}`,
      {
        headers: {
          'token': user?.token
        }
      }
    ).then(response => {
      const donation: Donation = response.data

      setInitialPosition({
        latitude: donation.latitude,
        longitude: donation.longitude
      })
      setPosition({
        latitude: donation.latitude,
        longitude: donation.longitude
      })
      setSelectedUf(donation.uf)
      setSelectedCity(donation.city)
      setInputFormData({
        title: donation.title,
        description: donation.description,
        neighbourhood: donation.neighbourhood,
        street: donation.street,
        number: donation.number
      })
      setSelectedCards(donation.categories)
    }).catch(error => {
      console.log(`[update donation] > ${error}`)
    })
  }, [user, uuid])

  return (
    <Container>
      <Header />

      <SignUpForm onSubmit={handleSubmitForm}>
        <Title>Cadastrar uma doação</Title>

        <Dropzone
          onFileUpload={file => setAvatar(file)}
        />

        <Fieldset legend="Informações do anúncio">
          <Input
            label="Título do anúncio"
            name="title"
            value={inputFormData.title}
            onChange={handleChangeFormData}
          />

          <Textarea
            label="Uma breve descrição sobre o item que será doado"
            name="description"
            value={inputFormData.description}
            onChange={handleChangeFormData}
          />
        </Fieldset>

        <Fieldset legend="Localização">
          <MapContainer>
            <Map
              style={{ width: '100%', height: '32rem', borderRadius: '.4rem', zIndex: 5 }}
              zoom={15}
              center={[initialPosition.latitude, initialPosition.longitude]}
              onClick={handleSetPosition}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 ? (
                <Marker
                  position={[position.latitude, position.longitude]}
                  icon={mapMarker}
                />
              ) : null}
            </Map>

            <MapDescription>
              <MapDescriptionText>
                Clique no mapa para selecionar sua localização
              </MapDescriptionText>
            </MapDescription>
          </MapContainer>

          <InputGroup2x2>
            <Select
              label="UF"
              name="uf"
              disabled={ufs.length === 0 ? true : false}
              onChange={event => setSelectedUf(event.target.value)}
            >
              {ufs.map((uf: State) => (
                <option key={uf.sigla} value={uf.sigla}>
                  {uf.nome}
                </option>
              ))}
            </Select>

            <Select
              label="Cidade"
              name="city"
              disabled={cities.length === 0 ? true : false}
              onChange={event => setSelectedCity(event.target.value)}
            >
              {cities.map((city: City) => (
                <option key={city.nome} value={city.nome}>
                  {city.nome}
                </option>
              ))}
            </Select>
          </InputGroup2x2>

          <InputGroup2x3x2>
            <Input
              label="Bairro"
              name="neighbourhood"
              value={inputFormData.neighbourhood}
              onChange={handleChangeFormData}
            />

            <Input
              label="Rua"
              name="street"
              value={inputFormData.street}
              onChange={handleChangeFormData}
            />

            <Input
              label="Nº residencial"
              name="number"
              example="Ex.: Nº 0092"
              value={inputFormData.number}
              onChange={handleChangeFormData}
            />
          </InputGroup2x3x2>
        </Fieldset>

        <Fieldset legend="Categoria do item">
          <CardContainer>
            {categories.map(category => (
              <CategoryCard
                key={category.id}
                label={category.title}
                iconUrl={category.icon_url}
                isCardSelected={isCardSelected(category.id, selectedCards) ? true : false}
                onClick={() => handleSelectCard(category.id)}
              />
            ))}
          </CardContainer>
        </Fieldset>

        <Button
          label="Enviar"
        />
      </SignUpForm>
    </Container>
  )
}

export default DonationUpdate
