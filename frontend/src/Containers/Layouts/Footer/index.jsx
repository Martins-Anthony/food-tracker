import { Logo } from '../../../Components/Logo'
import Modal from '../../Modal'

function Footer() {
  return (
    <footer className="border-top footer mt-5">
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
              idLabel="legalModalLabel"
              title="Mentions Légales"
              body={
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tellus leo,
                  volutpat vitae mi ultrices, sollicitudin blandit dui. Mauris ultricies iaculis leo
                  id consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                  per inceptos himenaeos. Sed
                </p>
              }
              footer={false}
            />
          </div>
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <a
                href="#"
                className="text-decoration-none text-dark"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Linkedin">
                <i className=" fab fa-linkedin fa-2x"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="#"
                className="text-decoration-none text-dark"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Instagram">
                <i className="fab fa-instagram-square fa-2x"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="#"
                className="text-decoration-none text-dark"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Twitter">
                <i className="fab fa-twitter-square fa-2x"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
