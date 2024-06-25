import { Link } from 'react-router-dom'
import { showModal } from '../../Containers/Modal/modalSlice'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

export const BUTTONS_TYPES = {
  BUTTON: 'button',
  LINK: 'link',
  MODAL: 'modal'
}
function Buttons({ type, address, label, onClick, className, modalMessage, modalId, ...props }) {
  const dispatch = useDispatch()

  const handleOpenModal = (event) => {
    event.preventDefault()
    dispatch(showModal({ message: modalMessage, id: modalId }))
  }

  const baseClass = 'btn mt-3'
  const buttonClass = className ? `${className}` : baseClass

  switch (type) {
    case BUTTONS_TYPES.LINK:
      return (
        <Link to={address} className={buttonClass} {...props}>
          {label}
        </Link>
      )

    case BUTTONS_TYPES.MODAL:
      return (
        <button className={buttonClass} onClick={handleOpenModal} {...props}>
          {label}
        </button>
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
  modalId: (props, propName, componentName) => {
    if (props.type === BUTTONS_TYPES.MODAL && !props[propName]) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed. \`${propName}\` is required when \`type\` is \`MODAL\`.`
      )
    }
  }
}

Buttons.defaultProps = {
  type: BUTTONS_TYPES.BUTTON
}

export default Buttons
