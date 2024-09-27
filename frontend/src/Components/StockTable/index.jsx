import React from 'react'
import StorageAreaList from '../StorageAreaList'

import ProductSearch from '../../Containers/ProductSearch'

function StockTable() {
  return (
    <section className={`container p-3`}>
      <ProductSearch />
      <StorageAreaList />
    </section>
  )
}

export default StockTable
