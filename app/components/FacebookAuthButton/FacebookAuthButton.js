import React from 'react'
import PropTypes from 'prop-types'
import {button} from './styles.css'

FacebookAuthButton.propTypes = {
  onAuth: PropTypes.func.isrequired,
  isFetching: PropTypes.bool.isRequired
}

export default function FacebookAuthButton ({onAuth, isFetching}) {
  return (
    <div>
      <button onClick={onAuth} className={button}>
        { isFetching === true
          ? 'Loading'
          : 'Login With Facebook'
        }
      </button>
    </div>
  )
}
