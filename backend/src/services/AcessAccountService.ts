import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';

import Users from '../models/entities/Users';

import createToken from '../auth/createToken';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class AcessAccountService {
  public execute = async ({ email, password }: Request): Promise<Response> => {
    const usersRepositories = getRepository(Users);

    const user = await usersRepositories.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordIsEquals = await bcrypt.compare(password, user.password);

    if (!passwordIsEquals) {
      throw new Error('Incorrect email/password combination');
    }

    const token = createToken(user.id);

    return { user, token };
  };
}

export default AcessAccountService;
