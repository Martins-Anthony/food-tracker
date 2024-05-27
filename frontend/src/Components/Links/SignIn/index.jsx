import React from 'react'
import { Link } from 'react-router-dom'

function LinkSignup() {
  return (
    <p>
      Vous n&apos;avez pas de compte ? <Link to="/signup">S&apos;inscrire</Link>
    </p>
  )
}

export default LinkSignup
