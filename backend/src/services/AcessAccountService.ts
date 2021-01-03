import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Users from '../models/entities/Users';

import CreateToken from '../auth/CreateToken';
import AppError from '../errors/AppError';

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
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordIsEquals = await compare(password, user.password);

    if (!passwordIsEquals) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = CreateToken(user.id);

    return { user, token };
  };
}

export default AcessAccountService;
