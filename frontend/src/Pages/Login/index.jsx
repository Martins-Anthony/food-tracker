import React from 'react'
import { Link } from 'react-router-dom'
import { LogoAndIconUser } from '../../Components/Logo'
import Verify_token from '../../Containers/Forms/MagicLink/Verify_token'

function Login() {
  return (
    <section className="container mt-5 py-4">
      <div className="row justify-content-center mx-1">
        <div className="col-12 col-md-6 border py-5 rounded-5">
          <LogoAndIconUser />
          <h2>Se connecter</h2>
          <Verify_token />
          <p className="mt-5">
            Vous n&apos;avez pas de compte ? <Link to="/signup">S&apos;inscrire</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
