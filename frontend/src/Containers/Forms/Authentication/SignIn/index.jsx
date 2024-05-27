import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { select } from '../../../../App/store/selectors'

function SignIn() {
  const navigate = useNavigate()
  const auth = useSelector(select.auth).magicLink
  const handleEmailSubmit = (event) => {
    event.preventDefault()
    if (auth) {
      navigate(`/enter/${event.target.email.value.toLowerCase()}/${auth}}`)
    } else {
      navigate(`/login`)
    }
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <section className="row justify-content-center">
        <Fields type={TYPE_FIELD.INPUT_MAIL} />
      </section>
      <Buttons type={BUTTONS_TYPES.BUTTONS} label="Se connecter" />
    </form>
  )
}

export default SignIn
