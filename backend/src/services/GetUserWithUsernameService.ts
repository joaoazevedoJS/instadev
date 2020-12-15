// import Users from '../models/entities/Users';
import UsersRepositories from '../repositories/UsersRepositories';

class GetUserWithUsernameService {
  private usersRepositories: UsersRepositories;

  constructor(userRepositories: UsersRepositories) {
    this.usersRepositories = userRepositories;
  }

  public execute = async (user_name: string): Promise<void> => {
    // const user = await this.usersRepositories.getUserByUsername(user_name);
    // if (!user) throw new Error('User not found!');
    // user.password = undefined;
  };
}

export default GetUserWithUsernameService;
