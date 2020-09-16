import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import Donations from './pages/Donations'
import UserSignUp from './pages/UserSignUp'
import ONGSignUp from './pages/ONGSignUp'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/donations" exact component={Donations} />

        <Route path="/user/signup" exact component={UserSignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
