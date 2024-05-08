import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link className="navbar-brand text-uppercase fw-bold text-dark" to="/index.html">
      <span className="bg-primary bg-gradient p-1 rounded-3 text-light">Food</span> Tracker
    </Link>
  )
}

export default Logo
