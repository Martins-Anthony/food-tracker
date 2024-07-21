export const DateToday = () => {
  const result = new Date().toISOString().slice(0, 10)
  return result
}
