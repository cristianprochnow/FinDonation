import React, {
  useEffect,
  useState
} from 'react'
import Header from '../../components/Header'
import './styles.css'
import Title from '../../components/Title'
import Description from '../../components/Description'
import {
  RiWhatsappLine,
  RiMailLine
} from 'react-icons/ri'
import { useHistory, useParams } from 'react-router-dom'
import { api } from '../../services/api'
import { ClipLoader } from 'react-spinners'
import { handleRedirectToEmail, handleRedirectToWhatsApp } from '../../utils/handleRedirect'

interface Donator {
  name: string
  bio: string
  avatar_url: string
  email: string
  whatsapp: string
}

const DonatorProfile: React.FC = () => {
  const { uuid } = useParams()
  const history = useHistory()
  const [donator, setDonator] = useState({} as Donator)

  // fetch donator data
  useEffect(() => {
    api.get(`/donator/${uuid}`)
      .then(({ data }) => setDonator(data))
      .catch(error => {
        alert('😥 Ooops... Não foi possível carregar as informações, no momento. Por favor, tente novamente a seguir.')
        history.goBack()
      })
  }, [history, uuid])

  if (!donator) return <ClipLoader />

  return (
    <div id="donator-profile">
      <Header />

      <main>
        <header>
          <img src={donator.avatar_url} alt={donator.name} />

          <Title>{donator.name}</Title>
          <Description>{donator.bio}</Description>
        </header>

        <footer>
          <button
            id="whatsapp"
            onClick={() => handleRedirectToWhatsApp(donator.whatsapp)}
          >
            <RiWhatsappLine size={20} />
            WhatsApp
          </button>
          <button
            id="email"
            onClick={() => handleRedirectToEmail(donator.email)}
          >
            <RiMailLine size={20} />
            E-mail
          </button>
        </footer>
      </main>
    </div>
  )
}

export default DonatorProfile
