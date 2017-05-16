import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Navigation from '../containers/Navigation/Navigation'
import HomeContainer from '../containers/Home/HomeContainer'
import { container } from './styles.css'


const routes = (
  <BrowserRouter>
    <div className={container}>
      <Navigation isAuthed={false} />
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route render={ () => {return <p>NOT FOUND!</p>}} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default routes
