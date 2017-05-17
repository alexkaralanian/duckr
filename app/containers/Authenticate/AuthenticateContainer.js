import React from 'react'
import Authenticate from '../../components/Authenticate/Authenticate'
import auth from '../../helpers/auth'

export default class AuthenticateContainer extends React.Component {

  handleAuth() {
    auth().then((user) => {
      console.log('Authed User', user)
    })
  }

  render(){
    return (
      <Authenticate
      isFethching={false}
      error=''
      onAuth={this.handleAuth} />
    )
  }
}

