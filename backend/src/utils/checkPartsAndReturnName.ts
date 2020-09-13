function checkPartsAndReturnName (user_name: string) {
  user_name = String(user_name).trim()

  const name = user_name.split(' ')

  if (name.length !== 1) return false

  return user_name
}

export default checkPartsAndReturnName
