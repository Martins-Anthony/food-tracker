import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import Spinners from '../../Components/Spinners'
import PropTypes from 'prop-types'

function LoadingWrapper({ children }) {
  const { loading } = useSelector(select.auth)

  if (loading) {
    return <Spinners />
  }

  return <>{children}</>
}

LoadingWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export default LoadingWrapper
