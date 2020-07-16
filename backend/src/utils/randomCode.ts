function randomCode (size: number): string {
  let code: string = ''

  for (let i = 0; i < size; i++) {
    code += Math.floor(Math.random() * 10)
  }

  return code
}

export default randomCode