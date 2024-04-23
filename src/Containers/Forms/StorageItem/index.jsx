import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectStorageArea, selectStorageAreaSelection } from '../../../App/store/selectors'
import FoodCategory from '../../../Components/FoodCategory'
import { addItemToStorage } from './storageItemSlice'

function StorageItem() {
  const storageArea = useSelector(selectStorageArea)
  const storageAreaSelection = useSelector(selectStorageAreaSelection)
  let selectedItemArea
  const dispatch = useDispatch()
  const [productName, setProduct] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productQuantity, setProductQuantity] = useState(0)
  const [productDate, setProductDate] = useState(new Date().toISOString().slice(0, 10))
  const [stock, setStock] = useState([])

  if (storageAreaSelection === '') {
    selectedItemArea = storageArea[0]
  } else {
    selectedItemArea = storageAreaSelection
  }
  const handleProductName = (event) => {
    setProduct(event.target.value)
  }
  const handleProductCategory = (event) => {
    setProductCategory(event.target.value)
  }
  const handleProductQuantity = (event) => {
    setProductQuantity(event.target.value)
  }
  const handleProductDate = (event) => {
    setProductDate(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    setStock([
      ...stock,
      { name: productName, category: productCategory, date: productDate, quantity: productQuantity }
    ])
    dispatch(
      addItemToStorage({
        areaName: selectedItemArea,
        item: {
          name: productName,
          category: productCategory,
          date: productDate,
          quantity: productQuantity
        }
      })
    )
    setProduct('')
    setProductCategory('')
    setProductQuantity(0)
    setProductDate(new Date().toISOString().slice(0, 10))
  }

  return (
    <form onSubmit={handleSubmit}>
      <FoodCategory onChange={handleProductCategory} />
      <label>
        {' '}
        Product{' '}
        <input type="text" name="product" onChange={handleProductName} value={productName} />
      </label>
      <label>
        {' '}
        Quantity{' '}
        <input
          type="number"
          min={0}
          defaultValue={productQuantity}
          onChange={handleProductQuantity}
        />
      </label>
      <label>
        {' '}
        Date limit{' '}
        <input type="date" name="date" onChange={handleProductDate} value={productDate} />
      </label>
      <button type="submit" className="btn">
        Validez
      </button>
    </form>
  )
}

export default StorageItem
