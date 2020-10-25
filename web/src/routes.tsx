import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Direct from './pages/Direct'
import Explorer from './pages/Explorer'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/direct" component={Direct} />
        <Route path="/explore" component={Explorer} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router