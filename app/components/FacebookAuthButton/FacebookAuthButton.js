import React from 'react'
import PropTypes from 'prop-types'
import {button} from './styles.css'

// parent component is Authentcate.js
// parent of that component is Authenticate Container.

export default function FacebookAuthButton ({fetchAndHandleAuthedUser, isFetching}) {

  return (
    <div>
      <button onClick={fetchAndHandleAuthedUser} className={button}>
        { isFetching === true
          ? 'Loading'
          : 'Login With Facebook'
        }
      </button>
    </div>
  )
}


FacebookAuthButton.propTypes = {
  fetchAndHandleAuthedUser: PropTypes.func.isrequired,
  isFetching: PropTypes.bool.isRequired
}
