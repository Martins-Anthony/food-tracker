import React from 'react'
import CreateStorageArea from '../../Containers/StorageArea/CreateStorageArea'
import StockTable from '../../Components/StockTable'

import { selectStorageArea } from '../../App/store/selectors'
import { useSelector } from 'react-redux'

function User() {
  const storageArea = useSelector(selectStorageArea)

  return (
    <section className="container">
      <div className="row justify-content-center align-items-center">
        <div className="mt-5">
          {storageArea.length === 0 ? (
            <div className="row justify-content-center">
              <CreateStorageArea />
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
