import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { select } from '../../App/store/selectors'
import Buttons from '../../Components/Buttons'
import Cards from '../../Components/Cards'
import Fields from '../../Components/Fields'

function ProductSearch() {
  const auth = useSelector(select.auth)
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const handleSearch = async () => {
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
  }

  return (
    <div>
      <h1>Search Products</h1>

      <Fields
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter product name or barcode"
      />
      <Buttons label="Search" onClick={handleSearch} />

      {error && <p>{error}</p>}
      <section className="container my-5">
        <div className="row gy-4 gy-md-0 mt-4">
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
      </section>
    </div>
  )
}

export default ProductSearch
