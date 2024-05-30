import Modal from '../index'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../../App/store/selectors'
import { resendLinkActive } from '../../Forms/Authentication/authSlice'
import { hideModal } from '../../Modal/modalSlice'

function Message() {
  const dispatch = useDispatch()
  const auth = useSelector(select.auth)
  const modal = useSelector(select.modal)

  const handleClickResendLink = (event) => {
    event.preventDefault()
    dispatch(resendLinkActive())
    dispatch(hideModal())
  }

  const textMessage = {
    text1: 'Veuillez vérifier votre boîte mail pour vous connecter.',
    text2: 'Si vous ne recevez pas de mail,',
    text3: 'veuillez vérifier votre dossier de courrier indésirable ou réessayer ',
    text4: (
      <Link to="#" onClick={handleClickResendLink}>
        En cliquant ici.
      </Link>
    )
  }

  return (
    <Modal
      id="errorModal"
      idLabel="errorModalLabel"
      title={modal.message}
      body={
        <p>
          {auth.resendLink ? (
            textMessage.text1
          ) : (
            <>
              {textMessage.text1}
              <br /> {textMessage.text2} <br /> {textMessage.text3}
              {textMessage.text4}
            </>
          )}
        </p>
      }
      isOpen={modal.show}
    />
  )
}

export default Message
