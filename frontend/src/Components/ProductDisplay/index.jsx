import Cards from '../../Components/Cards'
import CardsPagination from '../CardsPagination'
import PropTypes from 'prop-types'

const ProductDisplay = ({ products, itemsPerPage, currentPage, totalPages, onPageChange }) => {
  if (!Array.isArray(products) || products.length === 0) return null

  return (
    <div>
      <div className="row">
        {products.map((product, index) => (
          <Cards
            key={index}
            type={'presentation'}
            title={product.product_name}
            items={{
              image: { src: product.image_url, alt: product.product_name },
              brands: product.brands
            }}
          />
        ))}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <CardsPagination
          totalItems={totalPages * itemsPerPage}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

ProductDisplay.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

ProductDisplay.defaultProps = {
  itemsPerPage: 6
}

export default ProductDisplay
