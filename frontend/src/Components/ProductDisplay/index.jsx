import React, { useState } from 'react'
import Cards from '../../Components/Cards'
import CardsPagination from '../CardsPagination'
import PropTypes from 'prop-types'

const ProductDisplay = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage)

  if (products.length === 0) return null

  return (
    <div>
      <div className="row">
        {displayedProducts.map((product, index) => (
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
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

ProductDisplay.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProductDisplay
