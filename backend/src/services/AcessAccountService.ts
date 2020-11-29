import bcrypt from 'bcryptjs';

import GenerateToken from '../utils/GenerateToken';
import UsersRepositories from '../repositories/UsersRepositories';

interface Request {
  email: string;
  password: string;
}

class AcessAccountService {
  private usersRepositories: UsersRepositories;

  constructor(usersRepositories: UsersRepositories) {
    this.usersRepositories = usersRepositories;
  }

  public execute = async ({ email, password }: Request): Promise<string> => {
    const user = await this.usersRepositories.getUserByMail(email);

    if (!user) throw new Error('User not found!');

    const passwordIsEquals = await bcrypt.compare(password, user.password);

    if (!passwordIsEquals) throw new Error('Password not valid!');

    user.password = undefined;

    const token = GenerateToken(user.id);

    return token;
  };
}

export default AcessAccountService;
