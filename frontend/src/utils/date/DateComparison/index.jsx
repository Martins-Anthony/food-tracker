import PropTypes from 'prop-types'
import { differenceInDays } from 'date-fns'

const DateComparison = (date) => {
  const daysRemaining = differenceInDays(date, new Date())
  const daysRemainingText = getDaysRemainingText(daysRemaining)
  const checkDate = checkExpiredDate(daysRemaining)
  return { daysRemainingText, daysRemaining, checkDate }
}

const getDaysRemainingText = (daysRemaining) => {
  if (daysRemaining < 0) {
    const result = String(daysRemaining).split('-')
    return <span className="text-danger">expirer depuis {result[1]} jours</span>
  } else if (daysRemaining > 0) {
    return <span>{daysRemaining} jours restants</span>
  } else if (daysRemaining === 0) {
    return <span>dernier jour avant expiration</span>
  }
}

const checkExpiredDate = (date) => {
  let resultCheckExpiredDate = false
  if (date <= 0) {
    return resultCheckExpiredDate
  } else if (date >= 0) {
    return (resultCheckExpiredDate = true)
  }
}

DateComparison.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateComparison
