import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import DateComparison from '../../Containers/DateComparison'
import { iconsLibrary } from '../Icons/library'
import Cards from '../Cards'

function StockTable() {
  const storageArea = useSelector(select.storage).data.storageArea
  const storageItem = useSelector(select.storageItem)

  return (
    <section className="container">
      {storageArea.map((storageAreaItem, length) => {
        return (
          <>
            <div key={length}>
              <h2>{storageAreaItem}</h2>
              <p>
                (Nombre de produits :{' '}
                {storageItem[storageAreaItem] && storageItem[storageAreaItem].length})
              </p>
              <div className="row gy-4 gy-md-0 mt-4 mb-5">
                {storageItem[storageAreaItem] ? (
                  storageItem[storageAreaItem].map((item, index) => {
                    const date = new Date(item.date)
                    const formattedDate = date.toLocaleDateString()
                    const result = (
                      <>
                        <li className="list-group-item">Quantité : {item.quantity}</li>
                        <li className="list-group-item">Expire le : {formattedDate}</li>
                        <li className="list-group-item">
                          <DateComparison date={formattedDate} /> jours restants
                        </li>
                      </>
                    )
                    return <Cards key={index} type={'product'} title={item.name} items={result} />
                  })
                ) : (
                  <span>
                    Aucun élément trouvé{' '}
                    <Link to={iconsLibrary.navbar[2].link}>{iconsLibrary.navbar[2].icon}</Link>
                  </span>
                )}
              </div>
            </div>
          </>
        )
      })}
    </section>
  )
}

export default StockTable
