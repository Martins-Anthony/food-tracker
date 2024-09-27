import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { select } from '../store/selectors'
import '../../style/index.scss'

import Home from '../../Pages/Home'
import Error from '../../Pages/Error'
import AddProduct from '../../Pages/AddProduct'
import User from '../../Pages/User'
import PostStorages from '../../Pages/User/PostStorages'
import Signup from '../../Pages/Signup'
import Login from '../../Pages/Login'

import Header from '../../Containers/Layouts/Header'
import Footer from '../../Containers/Layouts/Footer'
import LoadingWrapper from '../../Containers/LoadingWrapper'
import Sidebar from '../../Containers/Layouts/Sidebar'
import Enter from '../../Containers/Forms/Authentication/Enter'

import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  const { isAuthenticated } = useSelector(select.auth)
  const { showSidebar } = useSelector(select.sidebar)

  return (
    <HashRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="d-flex flex-grow-1">
          {isAuthenticated && showSidebar && <Sidebar />}
          <main className="text-center d-flex flex-column flex-grow-1 style-background">
            <LoadingWrapper>
              <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/user" /> : <Home />} />
                <Route
                  path="/login"
                  element={isAuthenticated ? <Navigate to="/user" /> : <Login />}
                />
                <Route
                  path="/signup"
                  element={isAuthenticated ? <Navigate to="/user" /> : <Signup />}
                />
                <Route path="/enter/:email/:magicLink" element={<Enter />} />
                <Route path="/user" element={<ProtectedRoute element={User} />} />
                <Route
                  path="/user/storages/name/:methodRoutes"
                  element={<ProtectedRoute element={PostStorages} />}
                />
                <Route path="/user/addProduct" element={<ProtectedRoute element={AddProduct} />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </LoadingWrapper>
          </main>
        </div>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default AppRouter
