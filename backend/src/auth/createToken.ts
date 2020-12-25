import { sign } from 'jsonwebtoken';

import { hash, expiresIn } from '../configs/auth.json';

function createToken(id: string): string {
  const token = sign({}, hash, {
    subject: id,
    expiresIn,
  });

  return token;
}

export default createToken;
