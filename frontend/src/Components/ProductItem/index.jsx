import PropTypes from 'prop-types'
import DateComparison from '../../Containers/DateComparison'
import { DateToday } from '../../Containers/DateToday'
import FoodCategory from '../../Containers/Forms/FoodCategory'
import Fields, { TYPE_FIELD } from '../Fields'

const ProductItem = ({ item, onFieldChange, editMode }) => {
  const date = item.date ? new Date(item.date) : Date()
  const formattedDate = item.date ? date.toISOString().split('T')[0] : DateToday()

  const categoryMapping = {
    'en:vegetables': 'légumes',
    'en:legumes': 'légumes',
    'en:fruits': 'fruits',
    'en:meat': 'viandes',
    'en:fish': 'poissons',
    'en:cheeses': 'fromages'
  }

  const foundCategory = item.categories_tags
    ? item.categories_tags.find((element) => Object.keys(categoryMapping).includes(element))
    : null
  const category = foundCategory ? categoryMapping[foundCategory] : item.category
  console.log('found categories', category)
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <Fields
          type={TYPE_FIELD.INPUT_NUMBER}
          id="quantity"
          label="Quantité"
          readOnly={!editMode}
          defaultValue={typeof item.quantity === 'string' ? 1 : item.quantity}
          aria-label={`Quantité du produits`}
          onChange={(event) => onFieldChange('quantity', Number(event.target.value))}
          min={1}
        />
      </li>
      <li className="list-group-item">
        {!editMode ? (
          <Fields
            type={TYPE_FIELD.INPUT_TEXT}
            id="category"
            label="Catégorie"
            readOnly={!editMode}
            defaultValue={category}
            aria-label={`Catégorie du produits`}
          />
        ) : (
          <FoodCategory
            onChange={(event) => onFieldChange('category', event.target.value)}
            id="catégorie"
            defaultValue={category}
          />
        )}
      </li>
      <li className="list-group-item">
        <Fields
          type={TYPE_FIELD.INPUT_DATE}
          id="expire"
          label="Expire le"
          readOnly={!editMode}
          defaultValue={formattedDate}
          aria-label={`Date d'expiration du produits`}
          onChange={(event) => onFieldChange('date', event.target.value)}
        />
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
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    date: PropTypes.string,
    category: PropTypes.string,
    categories_tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onFieldChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired
}

export default ProductItem
