import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import auth from '@configs/auth';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IUsers from '@domain/users/entities/IUsers';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUsers;
  token: string;
}

@injectable()
class AcessAccountService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public execute = async ({
    email,
    password,
  }: IRequest): Promise<IResponse> => {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordIsEquals = await compare(password, user.password);

    if (!passwordIsEquals) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, auth.privateKey, {
      subject: user.id,
      ...auth.signOptions,
    });

    return { user, token };
  };
}

export default AcessAccountService;
