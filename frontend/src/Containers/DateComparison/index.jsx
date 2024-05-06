import PropTypes from 'prop-types'

function DateComparison({ date }) {
  const today = new Date()
  const [day, month, year] = date.split('/')
  const targetDate = new Date(`${year}-${month}-${day}`)
  const difference = targetDate.getTime() - today.getTime()

  const daysRemaining = Math.ceil(difference / (1000 * 3600 * 24))
  /*
  const monthsRemaining = Math.ceil(difference / (1000 * 3600 * 24 * 30.44))
  const yearsRemaining = Math.ceil(difference / (1000 * 3600 * 24 * 365))
  <p>Mois restants: {monthsRemaining}</p>
  <p>Années restantes: {yearsRemaining}</p>
  */
  return <>{daysRemaining}</>
}

DateComparison.propTypes = {
  date: PropTypes.string.isRequired
}

export default DateComparison
