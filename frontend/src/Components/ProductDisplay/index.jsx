import Cards from '../../Components/Cards'
import CardsPagination from '../CardsPagination'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const ProductDisplay = ({ products, itemsPerPage, currentPage, totalPages, onPageChange }) => {
  // if (!Array.isArray(products) || products.length === 0) return null
  const [dataDisplay, setDataDisplay] = useState(products)

  useEffect(() => {
    setDataDisplay(products)
  }, [products])

  if (!Array.isArray(products) || products.length === 0) return null

  console.log('products de ProductDisplay 11', products)
  return (
    <div>
      <div className="row">
        {dataDisplay.map((product, index) => (
          <Cards
            key={index}
            type={'presentation'}
            title={product.product_name}
            items={{
              image: {
                src: product.image_url,
                alt: product.product_name
              },
              brands: product.brands
            }}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <CardsPagination
            totalItems={totalPages * itemsPerPage}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </div>
      )}
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
