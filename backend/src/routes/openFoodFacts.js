const express = require('express')
const router = express.Router()
const {
  fetchProductByBarcode,
  searchProducts,
} = require('../controllers/openFoodFacts/service.js')

router.get('/search', async (req, res) => {
  const { query } = req.query
  try {
    if (!query) {
      return res.status(400).json({ error: 'Please provide a search query' })
    }

    // Check if the query is a barcode (digits only and typical barcode lengths)
    const isBarcode = /^\d{8,13}$/.test(query)

    if (isBarcode) {
      const productData = await fetchProductByBarcode(query)
      return res.json(productData)
    } else {
      const products = await searchProducts(query)
      return res.json(products)
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product data' })
  }
})

module.exports = router
