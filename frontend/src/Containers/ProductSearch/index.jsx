import React, { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import Fields from '../../Components/Fields'
import ProductDisplay from '../../Components/ProductDisplay'
import ItemScanner from '../../Components/Scanner/ItemScanner'
import { scanRemove } from '../../Components/Scanner/scannerSlice'

function ProductSearch() {
  const auth = useSelector(select.auth)
  const scannedCode = useSelector(select.scanner).scannedCode
  const dispatch = useDispatch()
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
    if (scannedCode) {
      setQuery(scannedCode)
      dispatch(scanRemove())
    }
  }, [scannedCode, dispatch])

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
    <div className="d-flex flex-column justify-content-center my-5">
      <h1>Ajouter un aliment</h1>
      <div className="d-flex justify-content-center">
        <Fields
          id="search-products"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.toLowerCase())
            setCurrentPage(1)
          }}
          placeholder="Entrer nom ou code-barres"
          className="col-11 col-sm-7 col-md-5 col-lg-4 col-xl-3"
        />
      </div>
      <div className="p-0 ms-2 my-2 d-md-none">
        <ItemScanner />
      </div>

      {loading && (
        <div className="container my-5">
          <Spinner />{' '}
        </div>
      )}
      {error && <p>{error}</p>}
      {query && products && (
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
      )}
    </div>
  )
}

export default ProductSearch
