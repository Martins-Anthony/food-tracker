import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from '../'
import Buttons from '../../../Components/Buttons'
import { hideModal } from '../modalSlice'
// import { deleteStorageArea } from '../../Storage/Delete/storageArea/deleteStorageArea'
import { getStorage } from '../../Storage/Get/getStorage'
import { select } from '../../../App/store/selectors'

function DeleteModal({ deleteAction, modalId }) {
  const dispatch = useDispatch()
  const selectModal = useSelector(select.modal)

  const handleClickConfirmDelete = async (event) => {
    event.preventDefault()
    await dispatch(deleteAction(selectModal.tag))
    dispatch(getStorage())
    dispatch(hideModal())
  }

  return (
    <Modal
      id={modalId}
      title="Confirmation de suppression"
      body={<span className="text-danger">{selectModal.message}</span>}
      footer={
        <>
          <Buttons
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              dispatch(hideModal())
            }}
            label="Annuler"
          />
          <Buttons
            type="button"
            className="btn btn-danger"
            onClick={handleClickConfirmDelete}
            label="Supprimer"
          />
        </>
      }
    />
  )
}

DeleteModal.propTypes = {
  deleteAction: PropTypes.func.isRequired,
  modalId: PropTypes.string.isRequired
}

export default DeleteModal
