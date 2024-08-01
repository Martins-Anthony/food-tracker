import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../Icons/navLinks'

function Logo() {
  return (
    <Link
      className="navbar-brand text-uppercase fw-bold text-dark"
      to="/"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Logo FOOD TRACKER">
      <span className="bg-success bg-gradient p-1 rounded-3 text-light">Food</span> Tracker
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
          fill: 'var(--bs-success)'
        })}
      </div>
    </>
  )
}

export { LogoAndIconUser, Logo }
