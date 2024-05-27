import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
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

function AppRouter() {
  const isAuthenticated = useSelector(select.auth).isAuthenticated

  return (
    <HashRouter>
      <Header />
      <main className="text-center">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to={'/user'} /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/enter/:email/:magicLink" element={<Enter />} />
          <Route path="/user" element={isAuthenticated ? <User /> : <Login />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Login />} />
          <Route path="/addProduct" element={isAuthenticated ? <AddProduct /> : <Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default AppRouter
