import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../App/store/selectors'
import DateComparison from '../../Containers/DateComparison'
import { iconList, iconsLibrary } from '../Icons/library'
import Cards from '../Cards'
import { showModal, hideModal } from '../../Containers/Modal/modalSlice'
import Modal from '../../Containers/Modal'
import { handleEditMode } from '../../Containers/EditMode/editModeSlice'
import { deleteStorageArea } from '../../Containers/Storage/Delete/storageArea/deleteStorageArea'
import { getStorage } from '../../Containers/Storage/Get/getStorage'
import NewStorageArea from '../../Containers/Storage/Post/StorageArea'
import { storageAreaSelected } from '../../Containers/Storage/storageSlice'

function StockTable() {
  const editMode = useSelector(select.editMode).status
  const storageData = useSelector(select.storage)
  const selectModal = useSelector(select.modal)
  const dispatch = useDispatch()

  const handleClickDelete = (event) => {
    event.preventDefault()
    const tag = event.currentTarget.dataset.tag
    dispatch(showModal({ text: `Attention !! voulez vous supprimer ${tag} ?`, data: tag }))
  }

  const handleClickConfirmDelete = async (event) => {
    event.preventDefault()
    await dispatch(deleteStorageArea(selectModal.message.data))
    dispatch(getStorage())
    dispatch(hideModal())
  }

  const dispatchSelected = (event) => {
    const tag = event.currentTarget.dataset.tag
    dispatch(storageAreaSelected(tag))
  }

  return (
    <section className={`container p-3 ${editMode ? 'border' : ''}`}>
      <div className="d-flex flex-row-reverse">
        {editMode ? (
          <button
            type="button"
            className="btn btn-outline-secondary col-auto"
            onClick={() => {
              dispatch(handleEditMode())
            }}>
            {iconList.checkIcon}
          </button>
        ) : (
          <button
            type="button"
            className="btn outline-secondary col-auto"
            onClick={() => {
              dispatch(handleEditMode())
            }}>
            {iconList.editIcon}
          </button>
        )}
      </div>
      {storageData.data.map((storageAreaItem, index) => {
        return (
          <div key={storageAreaItem.name}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="row">
                {editMode ? (
                  <NewStorageArea nameValue={storageAreaItem.name} />
                ) : (
                  <h2 className="me-3 col-auto">{storageAreaItem.name}</h2>
                )}
              </div>
              {editMode && (
                <button
                  type="button"
                  className="btn btn-outline-secondary "
                  data-tag={storageAreaItem.name}
                  onClick={handleClickDelete}>
                  {iconList.deleteIcon}
                </button>
              )}
            </div>
            <p>(Nombre de produits : {storageAreaItem.name && storageAreaItem.items.length})</p>
            <div className="row gy-4 gy-md-0 mt-4 mb-5">
              {storageAreaItem.name && storageAreaItem.items.length ? (
                storageAreaItem.items.map((item, itemIndex) => {
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
                  <Link
                    to={iconsLibrary.navbar[2].link}
                    data-tag={storageAreaItem.name}
                    onClick={dispatchSelected}>
                    {iconsLibrary.navbar[2].icon}
                  </Link>
                </span>
              )}
            </div>
          </div>
        )
      })}
      <Modal
        id="messageModal"
        body={
          <>
            <span className="text-danger">{selectModal.message.text}</span>{' '}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  dispatch(hideModal())
                }}>
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClickConfirmDelete}
                data-bs-dismiss="modal"
                aria-label="Supprimer">
                Supprimer
              </button>
            </div>
          </>
        }
        title="Mode edition"
        isOpen={selectModal.show}
      />
    </section>
  )
}

export default StockTable
