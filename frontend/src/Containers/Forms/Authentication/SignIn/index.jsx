import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../../../App/store/selectors'
import { register } from '../Register/registerSlice'
import Modal from '../../../Modal'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(select.auth).magicLink
  const handleModal = useSelector(select.modal).show
  const handleEmailSubmit = (event) => {
    event.preventDefault()
    if (auth) {
      navigate(`/enter/${event.target.email.value.toLowerCase()}/${auth}`)
    } else {
      dispatch(register({ email: event.target.email.value.toLowerCase() }))
    }
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <section className="row justify-content-center">
        <Fields type={TYPE_FIELD.INPUT_MAIL} />
      </section>
      <Buttons type={BUTTONS_TYPES.BUTTONS} label="Se connecter" />
      <Modal
        id="errorModal"
        idLabel="errorModalLabel"
        title={'test'}
        body={"Vous n'avez pas de compte ? S'inscrire"}
        isOpen={handleModal}
      />
    </form>
  )
}

export default SignIn
