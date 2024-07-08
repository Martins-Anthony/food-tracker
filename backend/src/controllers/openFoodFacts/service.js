const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const BASE_URL = 'https://world.openfoodfacts.org'

const fetchProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching product data by barcode:', error)
    throw error
  }
}

const searchProducts = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`,
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
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
