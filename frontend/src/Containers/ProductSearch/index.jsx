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
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === '') {
        setProducts([])
        return
      }
      setLoading(true)
      try {
        const response = await fetch(auth.api + `/users/openFoodFacts/search?query=${query}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (data.products) {
          setProducts(data.products)
        } else if (data.product) {
          setProducts([data.product])
        } else {
          setProducts([])
        }
        setError(null)
      } catch (error) {
        setError('Could not search products')
        setProducts([])
      }
      setLoading(false)
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query, auth.api])

  return (
    <div>
      <h1>Search Products</h1>
      <Fields
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter product name or barcode"
      />
      {loading && (
        <div className="container my-5">
          <Spinner />{' '}
        </div>
      )}
      {error && <p>{error}</p>}
      <section className="container my-5">
        <div className="row gy-4 gy-md-0 mt-4">
          <ProductDisplay products={products} />
        </div>
      </section>
    </div>
  )
}

export default ProductSearch
