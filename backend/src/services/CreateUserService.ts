import { getRepository } from 'typeorm';

import randomCode from '../utils/randomCode';

import Password from '../models/utils/Password';
import Users from '../models/entities/Users';

interface Request {
  email: string;
  user_name: string;
  name: string;
  password: Password;
}

class CreateUserService {
  public execute = async ({
    name,
    email,
    password,
    user_name,
  }: Request): Promise<Users> => {
    const usersRepositories = getRepository(Users);

    const mailAlreadyCreated = await usersRepositories.findOne({
      where: { email },
    });

    if (mailAlreadyCreated) throw new Error('E-mail already exist!');

    const userNameAlreadyCreated = await usersRepositories.findOne({
      where: { user_name },
    });

    if (userNameAlreadyCreated) throw new Error('user name already exist!');

    const passwordCripyted = await password.cryptPassword();

    const user = usersRepositories.create({
      email,
      password: passwordCripyted,
      user_name,
      name,
      verification_code: randomCode(6),
    });

    await usersRepositories.save(user);

    return user;
  };
}

export default CreateUserService;
