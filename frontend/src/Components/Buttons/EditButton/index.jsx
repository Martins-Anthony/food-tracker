import PropTypes from 'prop-types'
import Buttons from '..'
import DeleteModal from '../../../Containers/Modal/DeleteModal'

function EditButton({
  icon,
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
  const handleToggleEditMode = () => {
    onEditModeChange(!editMode)
  }

  const handleSave = () => {
    if (onSave) {
      onSave()
    }
    onEditModeChange(false)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    onEditModeChange(false)
  }

  return (
    <div className={`d-flex ${className}`}>
      {editMode ? (
        <>
          <Buttons
            className="btn btn-outline-success"
            onClick={handleSave}
            label={icon.checkIcon}
          />
          <Buttons
            className="btn btn-outline-secondary"
            onClick={handleCancel}
            label={icon.cancelIcon}
          />
          {showDeleteButton && (
            <Buttons
              type="modal"
              className="btn btn-outline-danger"
              tag={tag}
              label={icon.deleteIcon}
              modalMessage={modalMessage}
              modalId={modalIdButtonDelete}
              onClick={onDelete}
            />
          )}
          <DeleteModal deleteAction={modalDeleteAction} modalId={modalIdButtonDelete} />
        </>
      ) : (
        <Buttons
          className={`btn ${editMode ? 'btn-outline-secondary' : 'outline-secondary'} col-auto`}
          onClick={handleToggleEditMode}
          label={icon.editIcon}
        />
      )}
    </div>
  )
}

EditButton.propTypes = {
  icon: PropTypes.object.isRequired,
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
