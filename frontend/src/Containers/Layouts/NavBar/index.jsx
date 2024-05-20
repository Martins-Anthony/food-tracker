import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../../../Components/Logo'
import DateToday from '../../DateToday'
import { links } from '../../../Components/Icons/navLinks'
import { selectAuth } from '../../../App/store/selectors'
import { useSelector } from 'react-redux'
import Modal from '../../Modal'

function Navbar() {
  const isAuthenticated = useSelector(selectAuth).isAuthenticated
  const [renderedLinks, setRenderedLinks] = useState([])

  const renderedLogin = (
    <li className="nav-item">
      <NavLink
        className="nav-link text-uppercase fw-bold"
        to="/login"
        data-bs-placement="top"
        title="connection"
        data-bs-toggle="tooltip">
        {React.cloneElement(links[3].icon, {
          width: 24,
          height: 24
        })}
      </NavLink>
    </li>
  )

  useEffect(() => {
    function fetchLinks() {
      const filteredLinks = isAuthenticated
        ? links.filter((link) => link.name === 'connection')
        : links.filter((link) => link.name === 'disconnection')

      const rendered = links.map((link, index) => {
        if (filteredLinks.length > 0 && link.name !== filteredLinks[0].name) {
          return (
            <li key={index} className="nav-item">
              <NavLink
                className="nav-link text-uppercase fw-bold"
                to={link.link}
                data-bs-placement="top"
                title={link.name}
                data-bs-toggle={link.dataBsToggle}
                data-bs-target={link.dataBsTarget}>
                {React.cloneElement(link.icon, {
                  width: 24,
                  height: 24
                })}
              </NavLink>
            </li>
          )
        }
      })
      setRenderedLinks(rendered)
    }

    fetchLinks()
  }, [isAuthenticated])

  return (
    <>
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
            <ul className="navbar-nav">{isAuthenticated ? renderedLinks : renderedLogin}</ul>
          </div>
        </div>
      </nav>
      <Modal
        id={'disconnectionModal'}
        idLabel={'disconnectionModalLabel'}
        title={'Déconnexion'}
        body={<p className="text-center">Êtes-vous sûr de vouloir vous déconnecter ?</p>}
        footer={true}
      />
    </>
  )
}

export default Navbar
