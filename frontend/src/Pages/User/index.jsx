import React from 'react'
import NewStorageArea from '../../Containers/StorageArea/NewStorageArea'
import StockTable from '../../Components/StockTable'

import { select } from '../../App/store/selectors'
import { useSelector } from 'react-redux'

function User() {
  const storageArea = useSelector(select.storageArea)

  return (
    <section className="container">
      <div className="row justify-content-center align-items-center">
        <div className="mt-5">
          {storageArea.length === 0 ? (
            <div className="row justify-content-center">
              <NewStorageArea />
            </div>
          ) : (
            <>
              <StockTable />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default User
