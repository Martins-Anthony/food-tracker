import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { select } from '../../../../../App/store/selectors'
import { postItemInStorage } from '../../../../Storage/Post/ItemInStorage/postItemInStorage'
import { getStorage } from '../../../../Storage/Get/getStorage'
import { putItemInStorage } from '../../../../Storage/Put/ItemInStorage/putItemInStorage'
import { DateToday } from '../../../../../utils/date/DateToday'
import { itemExpired } from '../../../../Storage/storageSlice'

export const useProductForm = (initialState = {}, onSuccess) => {
  const storageData = useSelector(select.storage)
  const dispatch = useDispatch()

  const [productName, setProduct] = useState(initialState.product_name || initialState.name || '')
  const [productNumber, setProductNumber] = useState(initialState.number || 1)
  const [productCategory, setProductCategory] = useState(
    initialState.category || initialState.foundCategory || ''
  )
  const [productQuantity, setProductQuantity] = useState(initialState.quantity || '')
  const [productDate, setProductDate] = useState(initialState.date || DateToday())
  const [productExpirationDate, setProductExpirationDate] = useState(
    initialState.expirationDate || false
  )
  const [stock, setStock] = useState([])
  const [redirect, setRedirect] = useState(false)
  const isSubmitting = useRef(false)
  const isNew = initialState.isNew !== undefined ? initialState.isNew : false

  const handleProductName = (event) => {
    setProduct(event.target.value)
  }
  const handleProductNumber = (event) => {
    setProductNumber(Number(event.target.value))
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
  const handleProductExpirationDate = (result) => {
    setProductExpirationDate(result)
    if (result.checkResult) {
      dispatch(itemExpired({ itemId: initialState._id, expirationDate: result }))
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (isSubmitting.current) return

    isSubmitting.current = true

    const newItem = {
      name: productName,
      number: productNumber,
      category: productCategory,
      date: productDate,
      quantity: productQuantity,
      image_url: initialState.image_url,
      expirationDate: productExpirationDate
    }

    const onSuccessCallback = () => {
      dispatch(getStorage())
      isSubmitting.current = false
      onSuccess && onSuccess()
    }

    if (!isNew) {
      const oldItemInStorage = { items: initialState }
      const newItemInStorage = { items: newItem }
      dispatch(putItemInStorage({ newItemInStorage, oldItemInStorage })).then(() => {
        onSuccessCallback()
      })
    } else {
      setStock([...stock, newItem])
      dispatch(postItemInStorage({ areaName: storageData.selected, newItem })).then(() => {
        onSuccessCallback()
      })
    }
    setRedirect(true)
  }

  return {
    productName,
    productNumber,
    productCategory,
    productQuantity,
    productDate,
    stock,
    redirect,
    handleProductName,
    handleProductNumber,
    handleProductCategory,
    handleProductQuantity,
    handleProductDate,
    handleProductExpirationDate,
    handleSubmit
  }
}
