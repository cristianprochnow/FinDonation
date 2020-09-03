import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from './pages/Home'
import Donations from './pages/Donations'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/donations" exact component={Donations} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
