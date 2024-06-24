import { useDispatch, useSelector } from 'react-redux'
import { handleEditMode } from '../../../Containers/EditMode/editModeSlice'
import Buttons from '..'
import { iconList } from '../../Icons/library'
import { select } from '../../../App/store/selectors'

function EditButton() {
  const editMode = useSelector(select.editMode).status
  const dispatch = useDispatch()

  return (
    <div className="d-flex flex-row-reverse">
      <Buttons
        className={`btn ${editMode ? 'btn-outline-secondary' : 'outline-secondary'} col-auto`}
        onClick={() => {
          dispatch(handleEditMode())
        }}
        label={editMode ? iconList.checkIcon : iconList.editIcon}
        modalId="messageModal"
      />
    </div>
  )
}

export default EditButton
