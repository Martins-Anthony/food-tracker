import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import Fields from '../../Components/Fields'
import ProductDisplay from '../../Components/ProductDisplay'

function ProductSearch() {
  const auth = useSelector(select.auth)
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const handleSearch = async (searchQuery, page) => {
    if (searchQuery.trim() === '') {
      setProducts([])
      return
    }
    setLoading(true)
    try {
      const response = await fetch(
        `${auth.api}/users/openFoodFacts/search?query=${query}&page=${page}&limit=${itemsPerPage}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      if (data.products) {
        setProducts(data.products)
        setTotalPages(data.totalPages)
      } else if (data.product) {
        setProducts([data.product])
        setTotalPages(1)
      } else {
        setProducts([])
        setTotalPages(1)
      }
      setError(null)
    } catch (error) {
      setError('Could not search products')
      setProducts([])
      setTotalPages(1)
    }
    setLoading(false)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(query, currentPage)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [query, currentPage, auth.api])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="d-flex flex-column">
      <h1>Search Products</h1>
      <div className="d-flex justify-content-center">
        <Fields
          id="search-products"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.toLowerCase())
            setCurrentPage(1)
          }}
          placeholder="Enter name or barcode"
        />
      </div>
      {loading && (
        <div className="container my-5">
          <Spinner />{' '}
        </div>
      )}
      {error && <p>{error}</p>}
      <section className="container my-5">
        <div className="row gy-4 gy-md-0 mt-4">
          <ProductDisplay
            products={products}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  )
}

export default ProductSearch
