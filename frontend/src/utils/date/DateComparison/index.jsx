import PropTypes from 'prop-types'
import { differenceInDays } from 'date-fns'

function DateComparison({ date }) {
  const daysRemaining = differenceInDays(date, new Date())
  return getDaysRemainingText(daysRemaining)
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

DateComparison.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateComparison
