import React, { useState } from 'react'
import { iconsLibrary } from '../../../Components/Icons/library'
import NavItems from '../../../Components/NavItems'
function Sidebar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible)
  }

  const hideSidebar = () => {
    setSidebarVisible(false)
  }

  const chevronIconName = isSidebarVisible ? 'chevron-left' : 'chevron-right'
  const chevronIcon = iconsLibrary.sidebar.find((icon) => icon.name === chevronIconName).icon

  return (
    <>
      <div className={`col-2 p-0 sidebar text-center ${isSidebarVisible ? 'show' : ''}`}>
        <NavItems />
      </div>
      <div className="d-md-none p-2 mt-5">
        <button className="btn btn-primary" onClick={toggleSidebar}>
          {chevronIcon}
        </button>
      </div>
      <div
        className={`sidebar-overlay ${isSidebarVisible ? 'show' : ''}`}
        onClick={hideSidebar}></div>
    </>
  )
}

export default Sidebar
