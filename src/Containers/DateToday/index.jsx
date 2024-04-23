import React from 'react'

function DateToday() {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear()).padStart(2, '0')
  return (
    <div>
      {day} / {month} / {year}
    </div>
  )
}

export default DateToday
