import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
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
import Enter from '../../Containers/Forms/MagicLink/Enter'
import { selectAuth } from '../store/selectors'
import { useSelector } from 'react-redux'

function AppRouter() {
  const isAuthenticated = useSelector(selectAuth).connection
  return (
    <HashRouter>
      <Header />
      <main className="text-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/enter/:email/:magicLink" element={<Enter />} />
          {isAuthenticated ? (
            <>
              <Route path="/user" element={<User />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/addProduct" element={<AddProduct />} />
            </>
          ) : null}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default AppRouter
