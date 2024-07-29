import PropTypes from 'prop-types'
import DateComparison from '../../Containers/DateComparison'
import { DateToday } from '../../Containers/DateToday'
import FoodCategory from '../../Containers/Forms/FoodCategory'
import Fields, { TYPE_FIELD } from '../Fields'
import { select } from '../../App/store/selectors'
import { useSelector } from 'react-redux'

const ProductItem = ({ item, onFieldChange, editMode }) => {
  const listCategory = useSelector(select.foodCategory)
  const date = item.date ? new Date(item.date) : Date()
  const formattedDate = item.date ? date.toISOString().split('T')[0] : DateToday()
  const defaultValueNumber = item.number ? Number(item.number) : 1
  const defaultValueQuantity = item.quantity ? item.quantity : ''

  const foundCategory = item.categories_tags
    ? item.categories_tags.find((element) => Object.keys(listCategory).includes(element))
    : null
  const category = foundCategory ? listCategory[foundCategory] : item.category

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
            defaultValue={category}
          />
        ) : (
          <>Catégorie : {category}</>
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
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    date: PropTypes.string,
    category: PropTypes.string,
    categories_tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired
}

export default ProductItem
