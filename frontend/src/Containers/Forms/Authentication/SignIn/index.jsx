import Fields, { TYPE_FIELD } from '../../../../Components/Fields'
import Buttons, { BUTTONS_TYPES } from '../../../../Components/Buttons'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../../../App/store/selectors'
import { register } from '../Register/registerSlice'
import { resendLink } from '../SignIn/resendLinkSlice'
import { resendLinkActive } from '../authSlice'
import { showModal } from '../../../Modal/modalSlice'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector(select.auth)

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value.toLowerCase()
    if (auth.resendLink) {
      dispatch(resendLink({ email: email }))
      dispatch(resendLinkActive())
      dispatch(showModal())
    } else {
      if (auth.magicLink) {
        navigate(`/enter/${email}/${auth}`)
      } else {
        dispatch(register({ email: email })).then(() => dispatch(showModal()))
      }
    }
  }
  return (
    <form onSubmit={handleEmailSubmit}>
      <section className="row justify-content-center">
        <Fields
          type={TYPE_FIELD.INPUT_MAIL}
          id="email"
          placeholder="entrez votre email"
          autoFocus
        />
      </section>
      <Buttons
        type={BUTTONS_TYPES.BUTTON}
        label={auth.resendLink ? 'Renvoyer le lien' : 'Se connecter'}
      />
    </form>
  )
}

export default SignIn
