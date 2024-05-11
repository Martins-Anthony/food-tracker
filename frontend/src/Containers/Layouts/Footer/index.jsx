import { Logo } from '../../../Components/Logo'

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
            <div
              className="modal fade"
              id="legalModal"
              aria-labelledby="legalModalLabel"
              aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="legalModalLabel">
                      Mentions Légales
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tellus leo,
                      volutpat vitae mi ultrices, sollicitudin blandit dui. Mauris ultricies iaculis
                      leo id consequat. Class aptent taciti sociosqu ad litora torquent per conubia
                      nostra, per inceptos himenaeos. Sed posuere risus viverra ornare porttitor.
                      Nullam egestas nec libero eget sagittis. Phasellus vulputate ante a vulputate
                      vehicula. Suspendisse nec dolor ante. Nunc auctor semper turpis. Duis quam
                      velit, aliquam ut mi vel, sollicitudin dapibus erat. Etiam vitae malesuada
                      urna. Vestibulum scelerisque lacus at molestie cursus. Donec placerat enim id
                      enim feugiat gravida. Integer ut maximus libero. Nulla faucibus dolor vitae
                      varius rutrum. Nunc neque sem, convallis id lorem quis, vulputate imperdiet
                      eros. Donec viverra commodo congue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
