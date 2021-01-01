import { getRepository } from 'typeorm';
import { isValid } from 'date-fns';

import Password from '../../models/utils/Password';
import Users from '../../models/entities/Users';

import RandomCode from '../../auth/RandomCode';
import AppError from '../../errors/AppError';

interface Request {
  email: string;
  user_name: string;
  name: string;
  password: Password;
  birthday: Date;
}

class CreateUserService {
  public execute = async ({
    name,
    email,
    password,
    user_name,
    birthday,
  }: Request): Promise<Users> => {
    const usersRepositories = getRepository(Users);

    if (!isValid(birthday)) {
      throw new AppError('Date is invalid');
    }

    const mailAlreadyCreated = await usersRepositories.findOne({
      where: { email },
    });

    if (mailAlreadyCreated) {
      throw new AppError('E-mail already exist!');
    }

    const userNameAlreadyCreated = await usersRepositories.findOne({
      where: { user_name },
    });

    if (userNameAlreadyCreated) {
      throw new AppError('user name already exist!');
    }

    const passwordCripyted = await password.cryptPassword();

    const user = usersRepositories.create({
      email,
      password: passwordCripyted,
      user_name,
      name,
      verification_code: RandomCode(),
      birthday,
    });

    await usersRepositories.save(user);

    return user;
  };
}

export default CreateUserService;
