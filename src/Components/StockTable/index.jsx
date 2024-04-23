import React from 'react'
import { useSelector } from 'react-redux'
import { selectStorageArea, selectStorageItem } from '../../App/store/selectors'
import DateComparison from '../../Containers/DateComparison'

function StockTable() {
  const storageArea = useSelector(selectStorageArea)
  const storageItem = useSelector(selectStorageItem)

  return (
    <div>
      {storageArea.map((storageAreaItem, length) => {
        return (
          <table key={length}>
            <caption>Stock {storageAreaItem}</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>category</th>
                <th>quantity</th>
                <th>product</th>
                <th>date limit</th>
                <th>remaining days</th>
              </tr>
            </thead>
            <tbody>
              {storageItem[storageAreaItem] ? (
                storageItem[storageAreaItem].map((item, index) => {
                  const date = new Date(item.date)
                  const formattedDate = date.toLocaleDateString()
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{item.name}</td>
                      <td>{formattedDate}</td>
                      <td>
                        <DateComparison date={formattedDate} />
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6">Aucun élément trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        )
      })}
    </div>
  )
}

export default StockTable
