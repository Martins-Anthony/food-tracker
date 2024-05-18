import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useDispatch } from 'react-redux'
import { register } from './registerSlice'

function Register() {
  const dispatch = useDispatch()
  const handleEmailSubmit = (event) => {
    event.preventDefault()
    dispatch(register({ email: event.target.email.value.toLowerCase() }))
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
