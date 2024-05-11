import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../../Containers/Layouts/NavBar/links'

function Logo() {
  return (
    <Link className="navbar-brand text-uppercase fw-bold text-dark" to="/">
      <span className="bg-primary bg-gradient p-1 rounded-3 text-light">Food</span> Tracker
    </Link>
  )
}

function LogoAndIconUser() {
  return (
    <>
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
    </>
  )
}

export { LogoAndIconUser, Logo }
