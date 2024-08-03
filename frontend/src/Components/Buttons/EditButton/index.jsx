import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Buttons, { BUTTONS_TYPES } from '..'
import DeleteModal from '../../../Containers/Modal/DeleteModal'
import { iconList } from '../../../Components/Icons/library'
import { getStorage } from '../../../Containers/Storage/Get/getStorage'

function EditButton({
  className,
  onCancel,
  onDelete,
  tag,
  modalMessage,
  onEditModeChange,
  modalIdButtonDelete,
  modalDeleteAction,
  showDeleteButton,
  editMode
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleToggleEditMode = (event) => {
    event.preventDefault()
    onEditModeChange(!editMode)
  }

  const handleCancel = (event) => {
    event.preventDefault()
    if (onCancel) {
      onCancel()
    }
    onEditModeChange(false)
    navigate('/user')
    dispatch(getStorage())
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    if (tag) {
      onDelete(event)
      dispatch(getStorage())
    }
  }

  return (
    <>
      {editMode ? (
        <div className={`bg-white d-flex ${className} pb-3 rounded-bottom-3`}>
          <Buttons
            type={BUTTONS_TYPES.SUBMIT}
            className="btn btn-outline-success"
            label={iconList.checkIcon}
          />
          <Buttons
            type={BUTTONS_TYPES.BUTTON}
            className="btn btn-outline-secondary"
            onClick={handleCancel}
            label={iconList.cancelIcon}
          />
          {showDeleteButton && (
            <Buttons
              type={BUTTONS_TYPES.MODAL}
              className="btn btn-outline-danger"
              tag={tag}
              label={iconList.deleteIcon}
              modalMessage={modalMessage}
              modalId={modalIdButtonDelete}
              onClick={handleDeleteClick}
            />
          )}
          <DeleteModal deleteAction={modalDeleteAction} modalId={modalIdButtonDelete} />
        </div>
      ) : (
        <div className={`d-flex ${className}`}>
          <Buttons
            type={BUTTONS_TYPES.BUTTON}
            onClick={handleToggleEditMode}
            className={`btn ${editMode ? 'btn-outline-secondary' : 'outline-secondary'} col-auto`}
            label={iconList.editIcon}
          />
        </div>
      )}
    </>
  )
}

EditButton.propTypes = {
  className: PropTypes.string,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  tag: PropTypes.string,
  modalMessage: PropTypes.string,
  onEditModeChange: PropTypes.func.isRequired,
  modalIdButtonDelete: PropTypes.string,
  modalDeleteAction: PropTypes.func,
  showDeleteButton: PropTypes.bool,
  editMode: PropTypes.bool.isRequired
}

EditButton.defaultProps = {
  className: '',
  onCancel: () => {},
  onDelete: () => {},
  tag: '',
  modalMessage: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  modalIdButtonDelete: 'defaultModalId',
  modalDeleteAction: () => {},
  showDeleteButton: true
}

export default EditButton
