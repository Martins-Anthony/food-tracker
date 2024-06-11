import React, { useState } from 'react'
import { iconsLibrary } from '../../Components/Icons/library'
import Sidebar from '../../Containers/Layouts/Sidebar'
import { select } from '../../App/store/selectors'
import { useSelector } from 'react-redux'

function Setting() {
  const storageArea = useSelector(select.storage).data.storageArea
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
    <div className="d-flex flex-grow-1">
      <div className={`col-2 p-0 sidebar ${isSidebarVisible ? 'show' : ''}`}>
        <Sidebar />
      </div>
      <div className="d-md-none p-2 mt-5">
        <button className="btn btn-primary" onClick={toggleSidebar}>
          {chevronIcon}
        </button>
      </div>
      <div
        className={`sidebar-overlay ${isSidebarVisible ? 'show' : ''}`}
        onClick={hideSidebar}></div>
      <section className="col p-2 m-2 mt-5">
        <div className="container bg-light border rounded-4">
          <div className="row my-4">
            <div className="col">
              <h2 className="text-base">zone de stockage :</h2>
            </div>
            <div className="col">
              <ul className="list-inline ">
                {storageArea.map((item, index) => {
                  return <li key={index}>{item}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Setting
