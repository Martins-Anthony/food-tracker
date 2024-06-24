import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../../Containers/Modal'
import PropTypes from 'prop-types'

export const BUTTONS_TYPES = {
  BUTTON: 'button',
  LINK: 'link',
  MODAL: 'modal'
}
function Buttons({
  type,
  address,
  label,
  onClick,
  className,
  modalMessage,
  modalTitle,
  modalConfirmLabel,
  modalCancelLabel,
  modalId,
  ...props
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleOpenModal = () => setModalIsOpen(true)
  const handleCloseModal = () => setModalIsOpen(false)

  const handleConfirmAction = () => {
    handleCloseModal()
    if (onClick) onClick()
  }

  const baseClass = 'btn mt-3'
  const buttonClass = className ? `${baseClass} ${className}` : baseClass

  switch (type) {
    case BUTTONS_TYPES.LINK:
      return (
        <Link to={address} className={buttonClass} {...props}>
          {label}
        </Link>
      )

    case BUTTONS_TYPES.MODAL:
      return (
        <>
          <button className={buttonClass} onClick={handleOpenModal} {...props}>
            {label}
          </button>
          <Modal
            id={modalId}
            title={modalTitle}
            body={
              <div>
                <p>{modalMessage}</p>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={handleCloseModal}>
                    {modalCancelLabel}
                  </button>
                  <button className="btn btn-danger" onClick={handleConfirmAction}>
                    {modalConfirmLabel}
                  </button>
                </div>
              </div>
            }
            isOpen={modalIsOpen}
          />
        </>
      )

    case BUTTONS_TYPES.BUTTON:
    default:
      return (
        <button className={buttonClass} onClick={onClick} {...props}>
          {label}
        </button>
      )
  }
}

Buttons.propTypes = {
  type: PropTypes.oneOf(Object.values(BUTTONS_TYPES)),
  address: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  modalMessage: PropTypes.string,
  modalTitle: PropTypes.string,
  modalConfirmLabel: PropTypes.string,
  modalCancelLabel: PropTypes.string,
  modalId: PropTypes.string.isRequired
}

Buttons.defaultProps = {
  type: BUTTONS_TYPES.BUTTON,
  modalConfirmLabel: 'Confirm',
  modalCancelLabel: 'Cancel'
}

export default Buttons
