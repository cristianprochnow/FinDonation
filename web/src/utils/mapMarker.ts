import Leaflet from 'leaflet'
import mapIcon from '../assets/images/logos/map-marker.svg'

const mapMarker = Leaflet.icon({
  iconUrl: mapIcon,
  iconSize: [56, 80],
  iconAnchor: [28, 80]
})

export default mapMarker
