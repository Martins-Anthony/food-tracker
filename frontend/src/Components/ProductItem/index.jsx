import PropTypes from 'prop-types'
import DateComparison from '../../Containers/DateComparison'
import { DateToday } from '../../Containers/DateToday'
import FoodCategory from '../../Containers/Forms/FoodCategory'
import Fields, { TYPE_FIELD } from '../Fields'

const ProductItem = ({ item, onFieldChange, editMode }) => {
  const date = item.date ? new Date(item.date) : Date()
  const formattedDate = item.date ? date.toISOString().split('T')[0] : DateToday()
  const defaultValueNumber = item.number ? Number(item.number) : 1
  const defaultValueQuantity = item.quantity ? item.quantity : ''
  const defaultValueCategory = item.category

  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        {editMode ? (
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
        ) : (
          <>Nombre : {defaultValueNumber}</>
        )}
      </li>
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
            defaultValue={formattedDate}
            aria-label={`Date d'expiration du produits`}
            onChange={(event) => onFieldChange('date', event.target.value)}
          />
        ) : (
          <>Expire le : {formattedDate} </>
        )}
      </li>
      {item.date ? (
        <li className="list-group-item">
          <DateComparison date={formattedDate} /> jours restants
        </li>
      ) : null}
    </ul>
  )
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    number: PropTypes.number,
    category: PropTypes.string,
    quantity: PropTypes.string,
    date: PropTypes.string
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool
}

export default ProductItem
