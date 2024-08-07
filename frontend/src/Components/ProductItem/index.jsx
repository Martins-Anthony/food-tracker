import PropTypes from 'prop-types'
import DateComparison from '../../utils/date/DateComparison'
import { DateToday } from '../../utils/date/DateToday'
import FoodCategory from '../../Containers/Forms/FoodCategory'
import DateFormatted from '../../utils/date/DateFormatted'
import Fields, { TYPE_FIELD } from '../Fields'
import { useEffect } from 'react'

const ProductItem = ({ item, onFieldChange, editMode }) => {
  const dateFormatted = (type) => DateFormatted(item.date || DateToday(), type)
  const { daysRemainingText, checkDate } = DateComparison(dateFormatted('en'))

  const defaultValueNumber = item.number ? Number(item.number) : 1
  const defaultValueQuantity = item.quantity ? item.quantity : ''
  const defaultValueCategory = item.category

  useEffect(() => {
    if (item && item._id) {
      onFieldChange('expirationDate', !checkDate)
    }
  }, [item])

  return (
    <ul className="list-group list-group-flush rounded-top-4">
      <li className="list-group-item pt-3">
        {editMode ? (
          <Fields
            type={TYPE_FIELD.INPUT_TEXT}
            id="title"
            label={'Noms'}
            defaultValue={item?.name || ''}
            readOnly={!editMode}
            aria-label={`titre du produits ${item?.name || ''}`}
            onChange={(event) => onFieldChange('name', event.target.value)}
          />
        ) : (
          <>Nombre : {defaultValueNumber}</>
        )}
      </li>
      {editMode ? (
        <li className="list-group-item">
          <Fields
            type={TYPE_FIELD.INPUT_NUMBER}
            id="number"
            label="Nombre"
            readOnly={!editMode}
            defaultValue={defaultValueNumber}
            aria-label={`Nombre de produit`}
            onChange={(event) => onFieldChange('number', Number(event.target.value))}
            min={1}
          />
        </li>
      ) : null}
      <li className="list-group-item">
        {editMode ? (
          <FoodCategory
            onChange={(event) => onFieldChange('category', event.target.value)}
            id="catégorie"
            defaultValue={defaultValueCategory}
          />
        ) : (
          <>Catégorie : {defaultValueCategory}</>
        )}
      </li>
      <li className="list-group-item">
        {editMode ? (
          <Fields
            type={TYPE_FIELD.INPUT_TEXT}
            id="quantity"
            label="Quantité"
            readOnly={!editMode}
            defaultValue={defaultValueQuantity}
            aria-label={`Quantité du produits`}
            onChange={(event) => onFieldChange('quantity', event.target.value)}
          />
        ) : (
          <>Quantité : {defaultValueQuantity}</>
        )}
      </li>
      <li className="list-group-item">
        {editMode ? (
          <Fields
            type={TYPE_FIELD.INPUT_DATE}
            id="expire"
            label="Expire le"
            readOnly={!editMode}
            defaultValue={dateFormatted('en')}
            aria-label={`Date d'expiration du produits`}
            onChange={(event) => onFieldChange('date', event.target.value)}
          />
        ) : (
          <>Expire le : {dateFormatted('fr')} </>
        )}
      </li>
      {item.date ? <li className="list-group-item">{daysRemainingText}</li> : null}
    </ul>
  )
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    category: PropTypes.string,
    quantity: PropTypes.string,
    date: PropTypes.string,
    _id: PropTypes.string
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool
}

export default ProductItem
