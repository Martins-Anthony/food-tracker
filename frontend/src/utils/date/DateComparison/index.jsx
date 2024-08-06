import PropTypes from 'prop-types'
import { differenceInDays } from 'date-fns'

function DateComparison({ date }) {
  const daysRemaining = differenceInDays(date, new Date())

  return getDaysRemainingText(daysRemaining)
}

const getDaysRemainingClass = (daysRemaining) => {
  if (daysRemaining < 0) {
    return 'text-danger'
  }
}

const getDaysRemainingText = (daysRemaining) => {
  if (daysRemaining < 0) {
    return (
      <span className={getDaysRemainingClass(daysRemaining)}>
        expirer depuis {daysRemaining} jours
      </span>
    )
  } else if (daysRemaining > 0) {
    return (
      <span className={getDaysRemainingClass(daysRemaining)}>{daysRemaining} jours restants</span>
    )
  } else if (daysRemaining === 0) {
    return (
      <span className={getDaysRemainingClass(daysRemaining)}>dernier jour avant expiration</span>
    )
  }
}

DateComparison.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateComparison
