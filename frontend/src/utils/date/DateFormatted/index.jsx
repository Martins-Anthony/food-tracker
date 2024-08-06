import PropTypes from 'prop-types'
import { format } from 'date-fns'

const DateFormatted = (date, type) => {
  let formatted
  switch (type) {
    case 'fr':
      formatted = format(date, 'dd/MM/yyyy')
      break
    case 'en':
    default:
      formatted = format(date, 'yyyy-MM-dd')
      break
  }
  return formatted
}

DateFormatted.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateFormatted
