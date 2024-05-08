import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const BUTTONS_TYPES = {
  REGISTER: 1,
  LOGIN: 2
}

function Buttons({ address, label, type }) {
  let component
  switch (type) {
    case BUTTONS_TYPES.REGISTER:
      component = (
        <Link to={'/login'} className="btn btn-primary mt-5">
          S&apos;inscrire
        </Link>
      )
      break
    case BUTTONS_TYPES.LOGIN:
      component = (
        <Link to={'/login'} className="btn btn-primary mt-5">
          Se connecter
        </Link>
      )
      break
    default:
      component = (
        <Link to={address} className="btn btn-primary mt-5">
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
