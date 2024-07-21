import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Buttons, { BUTTONS_TYPES } from '..'
import DeleteModal from '../../../Containers/Modal/DeleteModal'
import { iconList } from '../../../Components/Icons/library'

function EditButton({
  className,
  onSave,
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

  const handleToggleEditMode = (event) => {
    event.preventDefault()
    onEditModeChange(!editMode)
  }

  const handleSave = (event) => {
    event.preventDefault()
    if (onSave) {
      onSave()
    }
    onEditModeChange(false)
  }

  const handleCancel = (event) => {
    event.preventDefault()
    if (onCancel) {
      onCancel()
    }
    onEditModeChange(false)
    navigate('/user')
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    if (tag) {
      onDelete(event)
    }
  }

  return (
    <div className={`d-flex ${className}`}>
      {editMode ? (
        <>
          <Buttons
            type={BUTTONS_TYPES.SUBMIT}
            className="btn btn-outline-success"
            onClick={handleSave}
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
        </>
      ) : (
        <Buttons
          type={BUTTONS_TYPES.BUTTON}
          onClick={handleToggleEditMode}
          className={`btn ${editMode ? 'btn-outline-secondary' : 'outline-secondary'} col-auto`}
          label={iconList.editIcon}
        />
      )}
    </div>
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
  onSave: () => {},
  onCancel: () => {},
  onDelete: () => {},
  tag: '',
  modalMessage: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
  modalIdButtonDelete: 'defaultModalId',
  modalDeleteAction: () => {},
  showDeleteButton: true
}

export default EditButton
