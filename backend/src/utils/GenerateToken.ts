import jwt from 'jsonwebtoken'

import { hash } from '../auth/configs/hash.json'

function GenerateToken (id: number) {
  const token = jwt.sign({ id }, hash, {
    expiresIn: 86400
  })

  return token
}

export default GenerateToken
