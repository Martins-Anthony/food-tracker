import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import NewStorageArea from '../../Containers/Storage/Post/StorageArea'
import Buttons from '../Buttons'
import { iconList, iconsLibrary } from '../Icons/library'
import Cards from '../Cards'
import DateComparison from '../../Containers/DateComparison'
import { storageAreaSelected } from '../../Containers/Storage/storageSlice'

function StorageAreaItem({ storageAreaItem, editMode }) {
  const dispatch = useDispatch()

  const dispatchSelected = (event) => {
    const tag = event.currentTarget.dataset.tag
    dispatch(storageAreaSelected(tag))
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="row">
          {editMode ? (
            <NewStorageArea nameValue={storageAreaItem.name} />
          ) : (
            <h2 className="me-3 col-auto">{storageAreaItem.name}</h2>
          )}
        </div>
        {editMode && (
          <Buttons
            type="modal"
            className="btn btn-outline-secondary"
            data-tag={storageAreaItem.name}
            label={iconList.deleteIcon}
            modalMessage={`Êtes-vous sûr de vouloir supprimer ${storageAreaItem.name} ?`}
            modalId="deleteModal"
          />
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
                key={`product-${itemIndex}`}
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
}

StorageAreaItem.propTypes = {
  storageAreaItem: PropTypes.object.isRequired,
  editMode: PropTypes.bool
}

export default StorageAreaItem
