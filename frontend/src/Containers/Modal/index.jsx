import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { logout } from '../Forms/Authentication/authSlice'
import { hideModal } from './modalSlice'
import { useNavigate } from 'react-router-dom'

function Modal({ id, title, body, footer, isOpen }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickFooter = () => {
    dispatch(logout())
  }

  const handleClickHideModal = () => {
    const modal = document.getElementById(id)
    dispatch(hideModal())
    if (modal.id === 'errorModal') {
      dispatch(logout())
      navigate('/login')
    } else if (modal.id === 'messageModal') {
      dispatch(hideModal())
    }
  }

  const handleModal = () => {
    const modal = document.getElementById(id)
    if (modal) {
      if (isOpen) {
        modal.classList.add('show')
        modal.style.display = 'block'
      } else {
        modal.classList.remove('show')
        modal.style.display = 'none'
      }
    }
  }

  handleModal()

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${id}Label`}>
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClickHideModal}></button>
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
                onClick={handleClickFooter}
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
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.bool,
  isOpen: PropTypes.bool
}

Modal.defaultProps = {
  footer: false,
  isOpen: false
}

export default Modal
