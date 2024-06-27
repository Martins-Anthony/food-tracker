import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Buttons from '..'

function EditButton({ editMode, toggleEditMode, icon, className, label }) {
  const dispatch = useDispatch()

  return (
    <Buttons
      className={`btn ${editMode ? 'btn-outline-secondary' : 'outline-secondary'} col-auto`}
      onClick={() => {
        dispatch(toggleEditMode())
      }}
      label={editMode ? icon.checkIcon : icon.editIcon}
    />
  )
}

EditButton.propTypes = {
  editMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
  className: PropTypes.string,
  label: PropTypes.string
}

EditButton.defaultProps = {
  className: '',
  label: ''
}

export default EditButton
