import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  RiArrowLeftLine,
  RiAccountCircleFill,
  RiAddCircleFill
} from 'react-icons/ri'
import { Map as LeafletMap, Marker, TileLayer, Popup } from 'react-leaflet'

import './styles.css'

import { IGeoCoords } from './types'

import Button from '../../components/Button'
import ButtonWithIcon from '../../components/ButtonWithIcon'

const Map: React.FC = () => {
  const history = useHistory()

  const [geoCoords, setGeoCoords] = useState<IGeoCoords>({
    latitude: 0,
    longitude: 0
  })

  function handleNavigateBack(): void {
    history.goBack()
  }

  function handleNavigateToNextPage(route: string): void {
    history.push(route)
  }

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
        <ButtonWithIcon
          style={{ backgroundColor: '#FFF', color: '#5B4FDB' }}
          Icon={RiArrowLeftLine}
          iconSize="2.4rem"
          onClick={handleNavigateBack}
        />

        <div className="button-group">
          <ButtonWithIcon
            style={{ backgroundColor: '#FFF', color: '#5B4FDB' }}
            Icon={RiAccountCircleFill}
            iconSize="2.4rem"
            onClick={() => handleNavigateToNextPage('/ong/signup')}
          />

          <ButtonWithIcon
            Icon={RiAddCircleFill}
            iconSize="2.4rem"
            onClick={() => handleNavigateToNextPage('/donation/register')}
          />
        </div>
      </header>

      <main id="map">
        <LeafletMap
          style={{ width: '100%', height: '100%' }}
          center={[ geoCoords.latitude, geoCoords.longitude ]}
          zoom={13}
          animate={true}
          zoomControl={false}
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
