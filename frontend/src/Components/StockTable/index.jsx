import React, { useState } from 'react'
import EditButton from '../Buttons/EditButton'
import StorageAreaList from '../StorageAreaList'

import { iconList } from '../../Components/Icons/library'
import ProductSearch from '../../Containers/ProductSearch'

function StockTable() {
  const [editMode, setEditMode] = useState(false)

  const handleEditModeChange = () => {
    setEditMode((prevMode) => !prevMode)
  }

  return (
    <section className={`container p-3 ${editMode ? 'border' : ''}`}>
      <div className="d-flex flex-row-reverse">
        <EditButton
          icon={iconList}
          className="d-flex justify-content-around"
          onEditModeChange={handleEditModeChange}
          editMode={editMode}
          showDeleteButton={false}
        />
      </div>
      <ProductSearch />
      <StorageAreaList editMode={editMode} />
    </section>
  )
}

export default StockTable
