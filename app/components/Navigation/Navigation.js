import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { container, navContainer, link } from './styles.css'

// isAuthed is being passed down from the Router to the components (boolean)

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

function NavLinks ({isAuthed}){
  return isAuthed === true
  ? <ul>
      <li><Link className={link} to="/">{'Home'}</Link></li>
    </ul>
  : null
}

function ActionLinks ({isAuthed}){
  return isAuthed === true
  ? <ul>
      <li>NEW DUCK</li>
      <li><Link className={link} to="/logout">{'Logout'}</Link></li>
    </ul>
  : <ul>
      <li><Link className={link} to="/">{'Home'}</Link></li>
      <li><Link className={link} to="/auth">{'Authenticate'}</Link></li>
    </ul>
}

export default function Navigation ({isAuthed}) {

  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}
