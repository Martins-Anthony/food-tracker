import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from '../'
import Buttons, { BUTTONS_TYPES } from '../../../Components/Buttons'
import { hideModal } from '../modalSlice'
import { getStorage } from '../../Storage/Get/getStorage'
import { select } from '../../../App/store/selectors'

function DeleteModal({ deleteAction, modalId }) {
  const dispatch = useDispatch()
  const selectModal = useSelector(select.modal)

  const handleClickConfirmDelete = async (event) => {
    event.preventDefault()
    await dispatch(deleteAction(selectModal.tag))
    dispatch(hideModal())
    dispatch(getStorage())
  }

  return (
    <Modal
      id={modalId}
      title="Confirmation de suppression"
      body={<span className="text-danger">{selectModal.message}</span>}
      footer={
        <>
          <Buttons
            type={BUTTONS_TYPES.BUTTON}
            className="btn btn-secondary"
            onClick={(event) => {
              event.preventDefault()
              dispatch(hideModal())
            }}
            label="Annuler"
          />
          <Buttons
            type={BUTTONS_TYPES.BUTTON}
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
