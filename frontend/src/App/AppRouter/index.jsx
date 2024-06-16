import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { select } from '../store/selectors'
import '../../style/index.scss'

import Home from '../../Pages/Home'
import Settings from '../../Pages/Settings'
import Error from '../../Pages/Error'
import AddProduct from '../../Pages/AddProduct'
import User from '../../Pages/User'
import PostStorages from '../../Pages/User/PostStorages'
import Login from '../../Pages/Login'
import Signup from '../../Pages/Signup'

import Header from '../../Containers/Layouts/Header'
import Footer from '../../Containers/Layouts/Footer'
import LoadingWrapper from '../../Containers/LoadingWrapper'
import Sidebar from '../../Containers/Layouts/Sidebar'
import Enter from '../../Containers/Forms/Authentication/Enter'

import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  const { isAuthenticated } = useSelector(select.auth)

  return (
    <HashRouter>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div className="d-flex flex-grow-1">
          {isAuthenticated ? <Sidebar /> : null}
          <main className="text-center d-flex flex-column flex-grow-1 style-background">
            <LoadingWrapper>
              <Routes>
                <Route
                  path="/"
                  element={isAuthenticated ? <ProtectedRoute element={User} /> : <Home />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/enter/:email/:magicLink" element={<Enter />} />
                <Route path="/user" element={<ProtectedRoute element={User} />} />
                <Route path="/user/settings" element={<ProtectedRoute element={Settings} />} />
                <Route
                  path="/user/postStorages"
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
