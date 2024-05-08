import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Components/Logo'
import { links } from '../../Containers/Layouts/NavBar/links'

function Login() {
  return (
    <section className="container mt-5 py-4">
      <div className="row justify-content-center mx-1">
        <div className="col-12 col-md-6 border py-5 rounded-5">
          <h1>
            <Logo />
          </h1>
          <div className="py-5">
            {React.cloneElement(links[3].icon, {
              width: 160,
              height: 160,
              fill: 'var(--bs-primary)'
            })}
          </div>
          <h2>Se connecter</h2>
          <form action="/login/email" method="post">
            <section className="row justify-content-center">
              <div className="mb-3 col-8 col-md-7">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  autoFocus
                  className="form-control"
                />
              </div>
            </section>
            <button className="btn btn-primary" type="submit">
              Connexion
            </button>
          </form>
          <p className="mt-5">
            Vous n&apos;avez pas de compte ? <Link to="/signup">S&apos;inscrire</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
