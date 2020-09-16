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

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/donations" exact component={Donations} />

        <Route path="/user/signup" exact component={UserSignUp} />
        <Route path="/user/profile" exact component={UserProfile} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
