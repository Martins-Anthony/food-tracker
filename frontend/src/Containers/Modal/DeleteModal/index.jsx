import { useDispatch, useSelector } from 'react-redux'
import Modal from '../'
import Buttons from '../../../Components/Buttons'
import { hideModal } from '../modalSlice'
import { deleteStorageArea } from '../../Storage/Delete/storageArea/deleteStorageArea'
import { getStorage } from '../../Storage/Get/getStorage'
import { select } from '../../../App/store/selectors'

function DeleteModal() {
  const dispatch = useDispatch()
  const selectModal = useSelector(select.modal)

  const handleClickConfirmDelete = async (event) => {
    event.preventDefault()
    await dispatch(deleteStorageArea(selectModal.message.data))
    dispatch(getStorage())
    dispatch(hideModal())
  }

  return (
    <Modal
      id="messageModal"
      body={
        <>
          <span className="text-danger">{selectModal.message.text}</span>{' '}
          <div className="modal-footer">
            <Buttons
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                dispatch(hideModal())
              }}
              label="Annuler"
              modalId="cancel"
            />
            <Buttons
              type="button"
              className="btn btn-danger"
              onClick={handleClickConfirmDelete}
              label="Supprimer"
              modalId="delete"
            />
          </div>
        </>
      }
      title="Mode édition"
      isOpen={selectModal.show}
    />
  )
}

export default DeleteModal
