import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import Map from './pages/Map'
import ONGSignUp from './pages/ONGSignUp'
import DonationRegister from './pages/DonationRegister'
import ONGProfile from './pages/ONGProfile'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/map" component={Map} />

        <Route path="/ong/signup" component={ONGSignUp} />
        <Route path="/ong/profile" component={ONGProfile} />

        <Route path="/donation/register" component={DonationRegister} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
