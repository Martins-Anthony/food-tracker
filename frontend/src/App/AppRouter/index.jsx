import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from '../../Pages/Home'
import '../../style/index.scss'
import Header from '../../Containers/Layouts/Header'
import Footer from '../../Containers/Layouts/Footer'
import Settings from '../../Pages/Settings'
import Error from '../../Pages/Error'
import AddProduct from '../../Pages/AddProduct'
import User from '../../Pages/User'
import Login from '../../Pages/Login'
import Signup from '../../Pages/Signup'
import Enter from '../../Containers/Forms/Authentication/Enter'
import { select } from '../store/selectors'
import { useSelector } from 'react-redux'
import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  const { isAuthenticated } = useSelector(select.auth)

  return (
    <HashRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="text-center d-flex flex-column flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <ProtectedRoute element={User} /> : <Home />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/enter/:email/:magicLink" element={<Enter />} />
            <Route path="/user" element={<ProtectedRoute element={User} />} />
            <Route path="/settings" element={<ProtectedRoute element={Settings} />} />
            <Route path="/addProduct" element={<ProtectedRoute element={AddProduct} />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default AppRouter
