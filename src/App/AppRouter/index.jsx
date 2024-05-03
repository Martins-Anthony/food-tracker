import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Home from '../../Pages/Home'
import '../../style/index.scss'
import Header from '../../Containers/Layouts/Header'
import Settings from '../../Pages/Settings'
import Error from '../../Pages/Error'

function AppRouter() {
  return (
    <HashRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </HashRouter>
  )
}

export default AppRouter
