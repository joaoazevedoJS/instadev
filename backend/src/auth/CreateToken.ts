import { sign } from 'jsonwebtoken';

import auth from '../configs/auth';

function CreateToken(id: string): string {
  const token = sign({}, auth.privateKey, {
    subject: id,
    ...auth.signOptions,
  });

  return token;
}

export default CreateToken;
