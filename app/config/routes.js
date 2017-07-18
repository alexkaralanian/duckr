import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Navigation from '../components/Navigation/Navigation'
import HomeContainer from '../containers/Home/HomeContainer'
import AuthenticateContainer from '../containers/Authenticate/AuthenticateContainer'
import { container } from './styles.css'

// We are passing 'isAuthed' down from the State via the <Provider> to the Navigation Component, which will render a specific UI view depending on if isAuthed is true or false...

// Switch checks to see if any routes match if not render default NOT FOUND component.

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
