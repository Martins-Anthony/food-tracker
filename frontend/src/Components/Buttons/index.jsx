import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const BUTTONS_TYPES = {
  LINK_REGISTER: 1,
  LINK_LOGIN: 2,
  BUTTONS: 3
}

function Buttons({ address, label, type }) {
  let component
  let classBouton = 'btn btn-primary mt-3'
  switch (type) {
    case BUTTONS_TYPES.LINK_REGISTER:
      component = (
        <Link to={'/signup'} className={classBouton}>
          S&apos;inscrire
        </Link>
      )
      break
    case BUTTONS_TYPES.LINK_LOGIN:
      component = (
        <Link to={'/login'} className={classBouton}>
          Se connecter
        </Link>
      )
      break
    case BUTTONS_TYPES.BUTTONS:
      component = (
        <button className={classBouton} type="submit">
          {label}
        </button>
      )
      break
    default:
      component = (
        <Link to={address} className={classBouton}>
          {label}
        </Link>
      )
      break
  }
  return component
}

Buttons.propTypes = {
  address: PropTypes.string,
  label: PropTypes.string
}

export default Buttons
