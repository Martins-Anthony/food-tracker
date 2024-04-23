import React from 'react'
import DateToday from '../../Containers/DateToday'
import AddProduct from '../../Containers/Forms/StorageItem'
import CreateStorageArea from '../../Containers/StorageArea/CreateStorageArea'
import StockTable from '../../Components/StockTable'
import StorageAreaSelection from '../../Containers/StorageArea/StorageAreaSelection'

function Home() {
  return (
    <main>
      <DateToday />
      <CreateStorageArea />
      <StorageAreaSelection />
      <AddProduct />
      <StockTable />
    </main>
  )
}

export default Home
