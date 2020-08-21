import React, { useEffect, useState } from 'react'
import {
  RiArrowLeftLine,
  RiAccountCircleFill,
  RiAddCircleFill
} from 'react-icons/ri'
import { Map as LeafletMap, Marker, TileLayer, Popup } from 'react-leaflet'

import './styles.css'

import { IGeoCoords } from './types'

import Button from '../../components/Button'

const Map: React.FC = () => {
  const [geoCoords, setGeoCoords] = useState<IGeoCoords>({
    latitude: 0,
    longitude: 0
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords

        setGeoCoords({
          latitude,
          longitude
        })
      },
      error => {
        console.log({
          event: 'Unable to get actual geolocation...',
          description: error
        })
      },
      {
        timeout: 30000
      }
    )
  }, [])

  return (
    <div id="map-page">
      <header id="map-page-header">
        <Button
          style={{ backgroundColor: '#FFF', color: '#5B4FDB' }}
          onClick={() => {}}
        >
          <RiArrowLeftLine
            size="2.4rem"
            style={{ marginRight: '.8rem' }}
          />
          Voltar
        </Button>

        <div id="button-group">
          <Button
            style={{ backgroundColor: '#FFF', color: '#5B4FDB' }}
            onClick={() => {}}
          >
            <RiAccountCircleFill
              size="2.4rem"
            />
          </Button>

          <Button
            onClick={() => {}}
          >
            <RiAddCircleFill
              size="2.4rem"
            />
          </Button>
        </div>
      </header>

      <main id="map-page-content">
        <LeafletMap
          style={{ width: '100%', height: '100%' }}
          center={[ geoCoords.latitude, geoCoords.longitude ]}
          zoom={12}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            title="Show"
            position={[ geoCoords.latitude, geoCoords.longitude ]}
          >
            <Popup>
              Só vamo
            </Popup>
          </Marker>
        </LeafletMap>
      </main>

      <footer id="map-page-footer">

      </footer>
    </div>
  )
}

export default Map
