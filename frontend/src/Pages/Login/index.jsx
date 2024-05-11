import React from 'react'
import { Link } from 'react-router-dom'
import { LogoAndIconUser } from '../../Components/Logo'
import Connection from '../../Containers/Forms/MagicLink/Connection'

function Login() {
  return (
    <section className="container mt-5 py-4">
      <div className="row justify-content-center mx-1">
        <div className="col-12 col-md-6 border py-5 rounded-5">
          <LogoAndIconUser />
          <h2>Se connecter</h2>
          <Connection />
          <p className="mt-5">
            Vous n&apos;avez pas de compte ? <Link to="/signup">S&apos;inscrire</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
