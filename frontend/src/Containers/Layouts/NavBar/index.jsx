import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../../../Components/Logo'
import DateToday from '../../DateToday'
import { links } from './links'
function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light fixed-top">
      <div className="container">
        <Logo />
        <DateToday />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {links &&
              links.map((link, index) => {
                return (
                  <li key={index} className="nav-item">
                    <NavLink className="nav-link text-uppercase fw-bold" to={link.link}>
                      {React.cloneElement(link.icon, {
                        width: 24,
                        height: 24
                      })}
                    </NavLink>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
