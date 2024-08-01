import React from 'react'
import LinkLogin from '../../Components/Links/Login'
import { LogoAndIconUser } from '../../Components/Logo'
import Register from '../../Containers/Forms/Authentication/Register'
import Message from '../../Containers/Modal/Messages'

function Signup() {
  return (
    <section className="container mt-5 py-4">
      <div className="row justify-content-center mx-1">
        <div className="col-12 col-md-6 border py-5 rounded-5">
          <LogoAndIconUser />
          <h2 className="text-primary-emphasis">S&lsquo;inscrire</h2>
          <Register />
          <div className="mt-5">
            <LinkLogin />
          </div>
        </div>
        <Message />
      </div>
    </section>
  )
}

export default Signup
