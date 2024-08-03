export const getBackgroundGradient = (date) => {
  const today = new Date()
  const targetDate = new Date(date)
  const daysDifference = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))

  if (daysDifference < 0) {
    return 'expired-gradient'
  } else if (daysDifference < 7) {
    return 'less-than-7-days-gradient'
  } else if (daysDifference < 14) {
    return 'less-than-14-days-gradient'
  } else {
    return 'more-than-14-days-gradient'
  }
}
