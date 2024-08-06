export const DateToday = () => {
  return new Date().toISOString().slice(0, 10)
}
