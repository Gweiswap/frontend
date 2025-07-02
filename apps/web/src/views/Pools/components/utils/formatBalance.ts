export const formatToShowBalance = (balance: string | number) => {
  const data = String(balance)

  if (Number(balance) <= 0.000001) {
    return `0.000000...`
  }
  if (String(parseFloat(data)).length <= 10) {
    return parseFloat(data)
  }
  return `${data.slice(0, 10)}...`
}
