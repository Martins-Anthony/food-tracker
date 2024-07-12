const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 3600 })

const BASE_URL = 'https://world.openfoodfacts.org'

const fetchWithRetry = async (
  url,
  options = {},
  retries = 5,
  backoff = 300,
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error.message}`)
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, backoff * Math.pow(2, i)))
      } else {
        throw error
      }
    }
  }
}

const fetchProductByBarcode = async (barcode) => {
  const cacheKey = `barcode_${barcode}`
  const cachedProduct = cache.get(cacheKey)
  if (cachedProduct) {
    return cachedProduct
  }

  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/api/v0/product/${barcode}.json`,
    )
    cache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching product data by barcode:', error)
    throw error
  }
}

const searchProducts = async (query, offset = 1, limit = 10) => {
  const cacheKey = `search_${query}_page_${offset}_limit_${limit}`
  const cachedProducts = cache.get(cacheKey)
  if (cachedProducts) {
    return cachedProducts
  }

  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&page=${offset}&page_size=${limit}`,
    )
    const totalPages = Math.ceil(data.count / limit)
    const result = {
      products: data.products,
      totalPages,
      totalCount: data.count,
    }
    cache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}

module.exports = {
  fetchProductByBarcode,
  searchProducts,
}
