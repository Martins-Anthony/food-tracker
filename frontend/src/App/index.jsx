import AppRouter from './AppRouter'
import { Provider } from 'react-redux'
import { store } from './store/store'
import AuthProvider from '../Containers/Forms/Authentication/AuthProvider'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Provider>
  )
}

export default App
