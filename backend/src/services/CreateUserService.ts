import Email from '../models/Email';
import Password from '../models/Password';
import Users from '../models/Users';

import UsersRepositories from '../repositories/UsersRepositories';

interface Request {
  mail: Email;
  user_name: string;
  name: string;
  password: Password;
}

class CreateUserService {
  private usersRepositories: UsersRepositories;

  constructor(usersRepositories: UsersRepositories) {
    this.usersRepositories = usersRepositories;
  }

  public execute = async ({
    name,
    mail,
    password,
    user_name,
  }: Request): Promise<Users> => {
    const mailAlreadyCreated = await this.usersRepositories.mailAlreadyExist(
      mail.email,
    );

    if (mailAlreadyCreated) throw new Error('E-mail already exist!');

    const userNameAlreadyCreated = await this.usersRepositories.userNameAlreadyExist(
      user_name,
    );

    if (userNameAlreadyCreated) throw new Error('user name already exist!');

    const passwordEnCripyted = await password.cryptPassword();

    const user = await this.usersRepositories.create({
      email: mail.email,
      password: passwordEnCripyted,
      user_name,
      name,
    });

    return user;
  };
}

export default CreateUserService;
