import React from 'react'
import PropTypes from 'prop-types'
import {centeredContainer, largeHeader, errorMsg} from '../../sharedStyles/styles.css'
import FacebookAuthButton from '../../components/FacebookAuthButton/FacebookAuthButton'

// Here we're just passing in props and rendering UI
// Also passing as props isFetching and OnAuth as functions to FacebookAuthButton...

export default function Authenticate ({onAuth, isFetching, error}) {
  return (
    <div className={centeredContainer}> {/*Importing CSS*/}
      <h1 className={largeHeader}>{'Authenticate'}</h1> {/*Importing CSS*/}
      <FacebookAuthButton isFetching={isFetching} onAuth={onAuth} />{/*Click handler for Authentication*/}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired
}

