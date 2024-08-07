import React, { useState, useEffect, cloneElement } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../../../Components/Logo'
import { iconsLibrary } from '../../../Components/Icons/library'
import { select } from '../../../App/store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../Modal'
import { logout } from '../../Forms/Authentication/Logout/logoutSlice'
import { clearState } from '../../Forms/Authentication/authSlice'

function Navbar() {
  const isAuthenticated = useSelector(select.auth).isAuthenticated
  const [renderedLinks, setRenderedLinks] = useState([])
  const connectionIcon = iconsLibrary.navbar.find((link) => link.name === 'connection').icon
  const dispatch = useDispatch()

  const handleClickFooter = () => {
    dispatch(logout()).then(() => {
      dispatch(clearState())
    })
  }

  const renderedLogin = (
    <li className="nav-item">
      <NavLink
        className="nav-link text-uppercase fw-bold"
        to="/login"
        data-bs-placement="top"
        title="connection"
        data-bs-toggle="tooltip">
        {cloneElement(connectionIcon, {
          width: 24,
          height: 24,
          className: 'text-success'
        })}
      </NavLink>
    </li>
  )

  useEffect(() => {
    function fetchLinks() {
      const filteredLinks = isAuthenticated
        ? iconsLibrary.navbar.filter((link) => link.name === 'connection')
        : iconsLibrary.navbar.filter((link) => link.name === 'disconnection')

      const rendered = iconsLibrary.navbar.map((link, index) => {
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
                {cloneElement(link.icon, {
                  width: 24,
                  height: 24,
                  className: 'text-success'
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
        title={'Déconnexion'}
        body={<p className="text-center">Êtes-vous sûr de vouloir vous déconnecter ?</p>}
        footer={
          <>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClickFooter}
              data-bs-dismiss="modal"
              aria-label="Déconnexion">
              Déconnecter
            </button>
          </>
        }
      />
    </>
  )
}

export default Navbar
