import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { logout } from '../Forms/Authentication/authSlice'

function Modal({ id, idLabel, title, body, footer }) {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout())
  }
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={idLabel} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={idLabel}>
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div className="modal-body">{body}</div>
          {footer ? (
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                data-bs-dismiss="modal"
                aria-label="Déconnexion">
                Déconnecter
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  idLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.bool
}

export default Modal
