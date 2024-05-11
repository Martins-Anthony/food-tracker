import React from 'react'
import { LogoAndIconUser } from '../../Components/Logo'
import Register from '../../Containers/Forms/MagicLink/Register'

function Signup() {
  return (
    <section className="container mt-5 py-4">
      <div className="row justify-content-center mx-1">
        <div className="col-12 col-md-6 border py-5 rounded-5">
          <LogoAndIconUser />
          <h2>S&lsquo;inscrire</h2>
          <Register />
        </div>
      </div>
    </section>
  )
}

export default Signup
