import { Pagination } from 'react-bootstrap'
import PropTypes from 'prop-types'

const CardsPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber)
    }
  }

  const getPaginationItems = () => {
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages)
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - 4, 1)
    }

    const pages = []
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      )
    }
    return pages
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {getPaginationItems()}

      {totalPages > 5 && totalPages - currentPage > 2 ? <Pagination.Ellipsis /> : null}

      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  )
}

CardsPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default CardsPagination
