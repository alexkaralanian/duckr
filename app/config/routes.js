import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Navigation from '../components/Navigation/Navigation'
import HomeContainer from '../containers/Home/HomeContainer'
import AuthenticateContainer from '../containers/Authenticate/AuthenticateContainer'
import { container } from './styles.css'

// We are passing 'isAuthed' boolean prop down from the router to the Navigation Component

const routes = (
  <BrowserRouter>
    <div className={container}>
      <Navigation isAuthed={false} />
      <Switch>
        <Route exact path="/auth" component={AuthenticateContainer} />
        <Route exact path="/" component={HomeContainer} />
        <Route render={ () => {return <p>NOT FOUND!</p>}} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default routes
