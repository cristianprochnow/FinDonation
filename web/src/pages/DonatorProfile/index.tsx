import React from 'react'
import Header from '../../components/Header'
import image from '../../assets/images/image.jpg'
import './styles.css'
import Title from '../../components/Title'
import Description from '../../components/Description'
import {
  RiWhatsappLine,
  RiMailLine
} from 'react-icons/ri'

const DonatorProfile: React.FC = () => {
  return (
    <div id="donator-profile">
      <Header />

      <main>
        <header>
          <img src={image} alt="Exército da Salvação"/>

          <Title>Exército da Salvação</Title>
          <Description>Somos uma ONG que visa em ajudar o próximo e dar-lhe assim itens para auxiliar em sua vivência.</Description>
        </header>

        <footer>
          <button id="whatsapp">
            <RiWhatsappLine size={20} />
            WhatsApp
          </button>
          <button id="email">
            <RiMailLine size={20} />
            E-mail
          </button>
        </footer>
      </main>
    </div>
  )
}

export default DonatorProfile
