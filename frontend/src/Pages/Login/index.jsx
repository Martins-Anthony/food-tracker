import LinkSignup from '../../Components/Links/SignIn'
import { LogoAndIconUser } from '../../Components/Logo'
import SignIn from '../../Containers/Forms/Authentication/SignIn'
import Message from '../../Containers/Modal/Messages'

function Login() {
  return (
    <section className="container mt-5 py-4">
      <div className="row justify-content-center mx-1">
        <div className="col-12 col-md-6 border py-5 rounded-5">
          <LogoAndIconUser />
          <h2 className="text-primary-emphasis">Se connecter</h2>
          <SignIn />
          <div className="mt-5">
            <LinkSignup />
          </div>
        </div>
        <Message />
      </div>
    </section>
  )
}

export default Login
