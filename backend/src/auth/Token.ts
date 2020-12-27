import { sign } from 'jsonwebtoken';

import auth from '../configs/auth';

function Token(id: string): string {
  const token = sign({}, auth.hash, {
    subject: id,
    expiresIn: auth.expiresIn,
  });

  return token;
}

export default Token;
