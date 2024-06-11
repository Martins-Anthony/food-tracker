import React, { cloneElement } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '../../../Components/Logo'
import Modal from '../../Modal'
import { iconsSocialNetworks } from '../../../Components/Icons/socialNetworks'

function Footer() {
  const iconsSocial = iconsSocialNetworks.map((icon, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <NavLink
          to={icon.link}
          className="text-decoration-none text-dark"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={icon.name}>
          {cloneElement(icon.icon, {
            width: 24,
            height: 24
          })}
        </NavLink>
      </li>
    )
  })
  return (
    <footer className="border-top footer">
      <div className="container py-3">
        <div className="row align-items-center">
          <div className="col-12 col-md-4">
            <Logo />
          </div>
          <div className="col-12 col-md-4 text-center">
            <a
              href="#"
              className="text-dark text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#legalModal">
              Mentions légales
            </a>
            <Modal
              id="legalModal"
              title="Mentions Légales"
              body={
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tellus leo,
                  volutpat vitae mi ultrices, sollicitudin blandit dui. Mauris ultricies iaculis leo
                  id consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Sed
                </p>
              }
            />
          </div>
          <div className="col-12 col-md-4 text-md-end">
            <ul className="list-inline mb-0">{iconsSocial}</ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
