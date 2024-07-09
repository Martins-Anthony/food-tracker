const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 3600 })

const BASE_URL = 'https://world.openfoodfacts.org'

const fetchProductByBarcode = async (barcode) => {
  const cacheKey = `barcode_${barcode}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`)
    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`)
    }
    const data = await response.json()
    cache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching product data by barcode:', error)
    throw error
  }
}

const searchProducts = async (query) => {
  const cacheKey = `search_${query}`
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  try {
    console.log('********** test product ******** ', query)
    const response = await fetch(
      `${BASE_URL}/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`,
    )
    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`)
    }
    const data = await response.json()
    cache.set(cacheKey, data)
    console.log("************* cache key: ${cacheKey} data: ${data  **********")
    console.log(data)
    console.log("************* cache key: ${cacheKey} data: ${data  **********")
    return data
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}

module.exports = {
  fetchProductByBarcode,
  searchProducts,
}
