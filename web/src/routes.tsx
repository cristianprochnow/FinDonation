import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Donations from './pages/Donations'
import UserSignUp from './pages/UserSignUp'
import UserProfile from './pages/UserProfile'
import UserUpdate from './pages/UserUpdate'
import DonationCreation from './pages/DonationCreation'
import MyDonations from './pages/MyDonations'
import DonationUpdate from './pages/DonationUpdate'
import DonationDetail from './pages/DonationDetail'
import DonatorProfile from './pages/DonatorProfile'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/donations" exact component={Donations} />
        <Route path="/donation/create" exact component={DonationCreation} />
        <Route path="/donation/update/:uuid" exact component={DonationUpdate} />
        <Route path="/donation/detail/:uuid" exact component={DonationDetail} />
        <Route path="/donation/donator/:uuid" exact component={DonatorProfile} />
        <Route path="/user/signup" exact component={UserSignUp} />
        <Route path="/user/profile/:uuid" exact component={UserProfile} />
        <Route path="/user/update/:uuid" exact component={UserUpdate} />
        <Route path="/user/my-donations/:uuid" exact component={MyDonations} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
