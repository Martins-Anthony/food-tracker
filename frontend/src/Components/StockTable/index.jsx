import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../App/store/selectors'
import DateComparison from '../../Containers/DateComparison'
import { iconsLibrary, iconList } from '../Icons/library'
import Cards from '../Cards'
import { showModal } from '../../Containers/Modal/modalSlice'
import Modal from '../../Containers/Modal'

function StockTable() {
  const storageArea = useSelector(select.storage).data.storageArea
  const storageItem = useSelector(select.storageItem)
  const selectModal = useSelector(select.modal)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    event.preventDefault()
    dispatch(showModal(event.target.dataset.tag))
  }

  return (
    <section className="container">
      {storageArea.map((storageAreaItem, index) => {
        return (
          <>
            <div key={storageArea[index]}>
              <div className="d-flex justify-content-center align-items-center">
                <h2 className="me-3">{storageAreaItem}</h2>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-tag={storageAreaItem}
                  onClick={handleClick}>
                  {iconList.editIcon}
                </button>
              </div>
              <p>
                (Nombre de produits :{' '}
                {storageItem[storageAreaItem] && storageItem[storageAreaItem].length})
              </p>
              <div className="row gy-4 gy-md-0 mt-4 mb-5">
                {storageItem[storageAreaItem] ? (
                  storageItem[storageAreaItem].map((item, itemIndex) => {
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
                    return (
                      <Cards
                        key={`product-${index}-${itemIndex}`}
                        type={'product'}
                        title={item.name}
                        items={result}
                      />
                    )
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
      <Modal
        id="messageModal"
        body={<span>{selectModal.message}</span>}
        title="Mode edition"
        isOpen={selectModal.show}
      />
    </section>
  )
}

export default StockTable
