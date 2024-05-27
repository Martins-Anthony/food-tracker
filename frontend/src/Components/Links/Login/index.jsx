import React from 'react'
import { Link } from 'react-router-dom'

function LinkLogin() {
  return (
    <p>
      Vous avez un compte ? <Link to="/login">Se connecter</Link>
    </p>
  )
}

export default LinkLogin
