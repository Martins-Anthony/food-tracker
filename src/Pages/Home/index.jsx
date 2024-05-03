import React from 'react'
import AddProduct from '../../Containers/Forms/StorageItem'
import CreateStorageArea from '../../Containers/StorageArea/CreateStorageArea'
import StockTable from '../../Components/StockTable'
import StorageAreaSelection from '../../Containers/StorageArea/StorageAreaSelection'

function Home() {
  return (
    <>
      <CreateStorageArea />
      <StorageAreaSelection />
      <AddProduct />
      <StockTable />
    </>
  )
}

export default Home
