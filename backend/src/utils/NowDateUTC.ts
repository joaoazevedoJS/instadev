function nowDateUTC (day?: number) {
  const date = new Date()

  const dateUTC = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      day ? date.getDate() + day : date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  ).toString()

  return dateUTC
}

export default nowDateUTC
