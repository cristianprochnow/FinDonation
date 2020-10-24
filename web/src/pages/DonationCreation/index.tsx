import React, { useEffect, useState, ChangeEvent } from 'react'
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
import mapMarker from '../../utils/mapMarker'

interface State {
  nome: string
  sigla: string
}

interface City {
  nome: string
}

const DonationCreation: React.FC = () => {
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

    console.log(inputFormData)
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

  return (
    <Container>
      <Header />

      <SignUpForm onSubmit={() => {}}>
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

        <Button
          label="Enviar"
        />
      </SignUpForm>
    </Container>
  )
}

export default DonationCreation
