import React, { useEffect, useState } from 'react'
import { RiDeleteBinLine, RiPencilLine } from 'react-icons/ri'
import Header from '../../components/Header'
import { api } from '../../services/api'
import './styles.css'
import { useAuth } from '../../contexts/auth'

interface Donation {
  id: string
  title: string
  description: string
  image_url: string
}

const MyDonations: React.FC = () => {
  const sizeOfIconsWithinButtons = 22;
  const [donations, setDonations] = useState<Donation[]>([])
  const { user } = useAuth()

  async function deleteDonation(donationId: string) {
    function removeDonationFromList(
      donations: Donation[],
      donationId: string
     ) {
      const filteredDonations = donations
        .filter(donation => donation.id !== donationId)

      setDonations(filteredDonations)
    }

    try {
      await api.delete(
        `/donations/delete/${donationId}`,
        {
          headers: {
            'token': user?.token
          }
        }
      )

      removeDonationFromList(donations, donationId)
    } catch (error) {
      console.log(`[delete donation] > ${error}`)

      alert('😥 Ooops... Não foi possível apagar esta doação, no momento. Por favor, tente novamente mais tarde.')
    }
  }

  // * request donations by user id
  useEffect(() => {
    if (!!user) {
      api.get(
        `/user/donations/${user?.id}`,
        {
          headers: {
            'token': user?.token
          }
        }
      ).then(({ data }) => {
        setDonations(data)
      }).catch(error => {
        console.log(`[donations by user] > ${error}`)

        alert('😥 Ocorreu um erro durante o carregamento das doações, por favor tente novamente mais tarde.')
      })
    }
  }, [user])

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
              <button id="danger" onClick={() => deleteDonation(donation.id)}>
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
