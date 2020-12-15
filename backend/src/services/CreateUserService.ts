import { getCustomRepository } from 'typeorm';

import randomCode from '../utils/randomCode';

import Email from '../models/utils/Email';
import Password from '../models/utils/Password';
import Users from '../models/entities/Users';

import UsersRepositories from '../repositories/UsersRepositories';

interface Request {
  mail: Email;
  user_name: string;
  name: string;
  password: Password;
}

class CreateUserService {
  public execute = async ({
    name,
    mail: { email },
    password,
    user_name,
  }: Request): Promise<Users> => {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const mailAlreadyCreated = await usersRepositories.findOne({
      where: { email },
    });

    if (mailAlreadyCreated) throw new Error('E-mail already exist!');

    const userNameAlreadyCreated = await usersRepositories.findOne({
      where: { user_name },
    });

    if (userNameAlreadyCreated) throw new Error('user name already exist!');

    const passwordEnCripyted = await password.cryptPassword();

    const user = usersRepositories.create({
      email,
      password: passwordEnCripyted,
      user_name,
      name,
      user_avatar: 'default',
      verification_code: randomCode(6),
    });

    await usersRepositories.save(user);

    user.password = undefined;

    return user;
  };
}

export default CreateUserService;
