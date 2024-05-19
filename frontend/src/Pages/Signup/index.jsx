import React from 'react'
import { Link } from 'react-router-dom'
import { LogoAndIconUser } from '../../Components/Logo'
import Register from '../../Containers/Forms/Authentication/Register'

function Signup() {
  return (
    <section className="container mt-5 py-4">
      <div className="row justify-content-center mx-1">
        <div className="col-12 col-md-6 border py-5 rounded-5">
          <LogoAndIconUser />
          <h2>S&lsquo;inscrire</h2>
          <Register />
          <p className="mt-5">
            Vous avez un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Signup
