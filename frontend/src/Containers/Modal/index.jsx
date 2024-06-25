import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import { hideModal } from './modalSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Buttons from '../../Components/Buttons'

function Modal({ id, title, body, footer }) {
  const { show, id: modalId } = useSelector(select.modal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickHideModal = () => {
    dispatch(hideModal())
    if (id === 'errorModal') {
      navigate('/login')
    }
  }

  useEffect(() => {
    const modal = document.getElementById(id)
    if (modal) {
      if (show && id === modalId) {
        modal.classList.add('show')
        modal.style.display = 'block'
      } else {
        modal.classList.remove('show')
        modal.style.display = 'none'
      }
    }
  }, [id, show, modalId])

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
            <h1 className="modal-title fs-5 text-dark" id={`${id}Label`}>
              {title}
            </h1>
            <Buttons
              type={'button'}
              className={'btn-close'}
              onClick={handleClickHideModal}
              data-bs-dismiss="modal"
              aria-label="Close"
              label=""
            />
          </div>
          <div className="modal-body">{body}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node,
  onClose: PropTypes.func
}

Modal.defaultProps = {
  footer: null,
  title: '',
  onClose: null
}

export default Modal
