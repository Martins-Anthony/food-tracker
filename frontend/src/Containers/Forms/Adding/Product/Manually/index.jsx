import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { select } from '../../../../../App/store/selectors'
import FoodCategory from '../../../FoodCategory'
import { addItemToStorage } from '../storageItemSlice'
import { Navigate } from 'react-router-dom'

function Manually() {
  const storageArea = useSelector(select.storageArea)
  const storageAreaSelection = useSelector(select.storageAreaSelection)
  let selectedItemArea
  const dispatch = useDispatch()
  const [productName, setProduct] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productQuantity, setProductQuantity] = useState(0)
  const [productDate, setProductDate] = useState(new Date().toISOString().slice(0, 10))
  const [stock, setStock] = useState([])
  const [redirect, setRedirect] = useState(false)

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
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <FoodCategory onChange={handleProductCategory} />
      <label className="form-label p-3" htmlFor="InputProduct">
        {' '}
        Product{' '}
        <input
          type="text"
          name="product"
          onChange={handleProductName}
          value={productName}
          className="form-control"
          id="InputProduct"
        />
      </label>
      <label className="form-label p-3" htmlFor="InputQuantity">
        {' '}
        Quantity{' '}
        <input
          type="number"
          min={0}
          defaultValue={productQuantity}
          onChange={handleProductQuantity}
          className="form-control"
          id="InputQuantity"
        />
      </label>
      <label className="form-label p-3" htmlFor="InputDateLimit">
        {' '}
        Date limit{' '}
        <input
          type="date"
          name="date"
          onChange={handleProductDate}
          value={productDate}
          className="form-control"
          id="InputDateLimit"
        />
      </label>
      <button type="submit" className="btn btn-primary">
        Validez
      </button>
    </form>
  )
}

export default Manually
