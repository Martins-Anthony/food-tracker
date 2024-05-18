import CryptoJS from 'crypto-js'

export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.REACT_APP_CRYPTO_KEY
  ).toString()
  return encryptedData
}

export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.REACT_APP_CRYPTO_KEY)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}
