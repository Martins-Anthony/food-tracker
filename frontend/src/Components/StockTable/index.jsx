import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import DateComparison from '../../Containers/DateComparison'
import { links } from '../Icons/navLinks'

function StockTable() {
  const storageArea = useSelector(select.storage).data.storageArea
  const storageItem = useSelector(select.storageItem)

  return (
    <section>
      {storageArea.map((storageAreaItem, length) => {
        return (
          <table className="table table-striped" key={length}>
            <caption>Stock {storageAreaItem}</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">category</th>
                <th scope="col">quantity</th>
                <th scope="col">product</th>
                <th scope="col">date limit</th>
                <th scope="col">remaining days</th>
              </tr>
            </thead>
            <tbody>
              {storageItem[storageAreaItem] ? (
                storageItem[storageAreaItem].map((item, index) => {
                  const date = new Date(item.date)
                  const formattedDate = date.toLocaleDateString()
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
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
                  <td colSpan="6">
                    Aucun élément trouvé{' '}
                    <span>
                      {' '}
                      <Link to={links[2].link}>{links[2].icon}</Link>
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )
      })}
    </section>
  )
}

export default StockTable
