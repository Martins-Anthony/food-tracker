import PropTypes from 'prop-types'
import Presentation from './type/Presentation'
import Product from './type/Product'
function Cards({
  type,
  items,
  tag,
  onClick,
  activeEditMode,
  showDeleteButton,
  isNewProduct,
  hoverActive,
  onSuccess,
  onEditModeChange
}) {
  const getComponent = () => {
    switch (type) {
      case 'presentation':
        return (
          <Presentation
            onClick={onClick}
            hoverActive={hoverActive}
            items={items}
            productName={items.name}
          />
        )
      case 'product':
        return (
          <Product
            items={items}
            tag={tag}
            activeEditMode={activeEditMode}
            showDeleteButton={showDeleteButton}
            isNewProduct={isNewProduct}
            hoverActive={hoverActive}
            onSuccess={onSuccess}
            onEditModeChange={onEditModeChange}
          />
        )
      default:
        return null
    }
  }

  return getComponent()
}

Cards.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
  tag: PropTypes.string,
  onClick: PropTypes.func,
  activeEditMode: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  isNewProduct: PropTypes.bool,
  hoverActive: PropTypes.string,
  onSuccess: PropTypes.func,
  onEditModeChange: PropTypes.func
}

Cards.defaultProps = {
  onClick: () => {},
  activeEditMode: false,
  showDeleteButton: true,
  isNewProduct: false,
  hoverActive: '',
  onSuccess: null,
  onEditModeChange: () => {}
}

export default Cards
