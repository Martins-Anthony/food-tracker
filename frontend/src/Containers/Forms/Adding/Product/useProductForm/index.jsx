import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../../../../App/store/selectors'
import { postItemInStorage } from '../../../../Storage/Post/ItemInStorage/postItemInStorage'
import { getStorage } from '../../../../Storage/Get/getStorage'
import { putItemInStorage } from '../../../../Storage/Put/ItemInStorage/putItemInStorage'
import { DateToday } from '../../../../DateToday'

export const useProductForm = (initialState = {}, onSuccess) => {
  const storageData = useSelector(select.storage)
  const dispatch = useDispatch()

  const [productName, setProduct] = useState(initialState.product_name || initialState.name || '')
  const [productCategory, setProductCategory] = useState(initialState.category || '')
  const [productQuantity, setProductQuantity] = useState(initialState.quantity || 1)
  const [productDate, setProductDate] = useState(initialState.date || DateToday())
  const [stock, setStock] = useState([])
  const [redirect, setRedirect] = useState(false)
  const isSubmitting = useRef(false)
  const isNew = initialState.isNew !== undefined ? initialState.isNew : false

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
    if (isSubmitting.current) return
    console.log('event handleSubmit', event)

    isSubmitting.current = true

    const newItem = {
      name: productName,
      category: productCategory,
      date: productDate,
      quantity: productQuantity
    }

    const onSuccessCallback = () => {
      dispatch(getStorage())
      isSubmitting.current = false
      onSuccess && onSuccess()
    }

    if (!isNew) {
      console.log('initialState id', initialState)
      const oldItemInStorage = { items: initialState }
      const newItemInStorage = { items: newItem }
      dispatch(putItemInStorage({ newItemInStorage, oldItemInStorage })).then(() => {
        onSuccessCallback()
      })
      console.log('test successful put')
    } else {
      setStock([...stock, newItem])
      dispatch(postItemInStorage({ areaName: storageData.selected, newItem })).then(() => {
        onSuccessCallback()
      })
      console.log('test successful post')
    }
    /*
    setProduct('')
    setProductCategory('')
    setProductQuantity(1)
    setProductDate(DateToday())
    */
    setRedirect(true)
  }

  return {
    productName,
    productCategory,
    productQuantity,
    productDate,
    stock,
    redirect,
    handleProductName,
    handleProductCategory,
    handleProductQuantity,
    handleProductDate,
    handleSubmit
  }
}
