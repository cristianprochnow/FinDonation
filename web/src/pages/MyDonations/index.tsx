import React, { useState } from 'react'
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri'
import Header from '../../components/Header'
import './styles.css'
import imageOfExample from '../../assets/images/image.jpg'

interface Donation {
  id: string
  title: string
  description: string
  image_url: string
}

const MyDonations: React.FC = () => {
  const sizeOfIconsWithinButtons = 22;
  const donationsExamples = [
    {
      id: 'b3dd9f62-f9e0-4f68-aadc-41fe4248cf1e',
      title: 'Donation from show',
      description: 'Just a delicious donation!',
      image_url: imageOfExample
    },
    {
      id: '7a6e9ff9-4a09-437a-b04b-7189c504e014',
      title: 'Updated donation',
      description: 'Just a delicious update!',
      image_url: imageOfExample
    },
    {
      id: 'bf823241-dbbb-46f7-b2a0-808393e13c59',
      title: 'Top donation of the month',
      description: 'Top donation of the month!',
      image_url: imageOfExample
    }
  ]
  const [donations, setDonations] = useState<Donation[]>(donationsExamples)

  return (
    <div id="page-my-donations">
      <Header />

      <main>
        { donations.map(donation => (
          <div className="donation" key={donation.id}>
            <header>
              <img src={donation.image_url} alt={donation.title} />

              <section>
                <h1>{donation.title}</h1>
                <p>{donation.description}</p>
              </section>
            </header>

            <footer>
              <button id="danger">
                <RiDeleteBinLine size={sizeOfIconsWithinButtons} />
                Deletar
              </button>
              <button id="success">
                <RiPencilLine size={sizeOfIconsWithinButtons} />
                Editar
              </button>
            </footer>
          </div>
        )) }
      </main>
    </div>
  )
}

export default MyDonations
