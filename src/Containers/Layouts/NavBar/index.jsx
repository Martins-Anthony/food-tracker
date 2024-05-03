import { NavLink } from 'react-router-dom'
import DateToday from '../../DateToday'
import { links } from './links'
function Navbar() {
  console.log(links)
  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light fixed-top">
      <div className="container">
        <a className="navbar-brand text-uppercase fw-bold" href="/index.html">
          <span className="bg-primary bg-gradient p-1 rounded-3 text-light">Food</span> Tracker
        </a>
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
                      {link.icon}
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
