import { inject, injectable } from 'tsyringe';
import { isValid } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUsers from '../entities/IUsers';
import IUsersRepository from '../repositories/IUsersRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public execute = async (data: ICreateUserDTO): Promise<IUsers> => {
    if (!isValid(data.birthday)) {
      throw new AppError('Date is invalid');
    }

    const mailAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (mailAlreadyExists) {
      throw new AppError('E-mail already exists!');
    }

    const userNameAlreadyExists = await this.usersRepository.findByUserName(
      data.user_name.trim(),
    );

    if (userNameAlreadyExists) {
      throw new AppError('user name already exists!');
    }

    const user = await this.usersRepository.create(data);

    return user;
  };
}

export default CreateUserService;
