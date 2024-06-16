import React from 'react'
import NewStorageArea from '../../Containers/Storage/Post/NewStorageArea'
import StockTable from '../../Components/StockTable'

import { select } from '../../App/store/selectors'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getStorage } from '../../Containers/Storage/Get/getStorage'
import { WelcomeMessage } from '../../Components/WelcomeMessage'

function User() {
  const storageArea = useSelector(select.storage).data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStorage())
  }, [dispatch])

  return (
    <section className="container">
      <div className="row justify-content-center align-items-center">
        <div className="mt-5">
          {storageArea === null || storageArea.length === undefined || storageArea.length === 0 ? (
            <div className="row justify-content-center">
              <WelcomeMessage />
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
// || storageArea.storageArea.length === 0
