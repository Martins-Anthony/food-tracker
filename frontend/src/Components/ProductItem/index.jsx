import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import DateComparison from '../../Containers/DateComparison'
import Fields, { TYPE_FIELD } from '../Fields'

const ProductItem = ({ item }) => {
  const editMode = useSelector(select.editMode)
  const date = new Date(item.date)
  const formattedDate = date.toISOString().split('T')[0]

  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <Fields
          type={TYPE_FIELD.INPUT_NUMBER}
          id="quantity"
          label="Quantité :"
          readOnly={!editMode.cardStatus}
          defaultValue={item.quantity}
          aria-label={`Quantité du produits`}
        />
      </li>
      <li className="list-group-item">
        <Fields
          type={TYPE_FIELD.INPUT_TEXT}
          id="category"
          label="Catégorie :"
          readOnly={!editMode.cardStatus}
          defaultValue={item.category}
          aria-label={`Catégorie du produits`}
        />
      </li>
      <li className="list-group-item">
        <Fields
          type={TYPE_FIELD.INPUT_DATE}
          id="expire"
          label="Expire le :"
          readOnly={!editMode.cardStatus}
          defaultValue={formattedDate}
          aria-label={`Date d'expiration du produits`}
        />
      </li>
      <li className="list-group-item">
        <DateComparison date={formattedDate} /> jours restants
      </li>
    </ul>
  )
}

ProductItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
}

export default ProductItem
