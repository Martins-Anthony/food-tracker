import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useDispatch } from 'react-redux'
import { registerUser } from '../authSlice'

function Register() {
  const dispatch = useDispatch()
  const handleEmailSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('email', event.target.email.value.toLowerCase())

    dispatch(registerUser({ email: event.target.email.value.toLowerCase() }))
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <section className="row justify-content-center">
        <Fields type={TYPE_FIELD.INPUT_MAIL} />
      </section>
      <Buttons type={BUTTONS_TYPES.BUTTONS} label="S'inscrire" />
    </form>
  )
}

export default Register
