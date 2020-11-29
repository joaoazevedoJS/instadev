import Users from '../models/Users';
import knex from '../database/connection';

interface CreateUserDTO {
  email: string;
  user_name: string;
  name: string;
  password: string;
}

class UsersRepositories {
  private table = 'users';

  public getUserByMail = async (email: string): Promise<Users> => {
    const user = await knex<Users>(this.table)
      .where({ email })
      .select('*')
      .first();

    return user;
  };

  public create = async ({
    email,
    name,
    password,
    user_name,
  }: CreateUserDTO): Promise<Users> => {
    const user = new Users({ email, name, user_name, password });

    const [id] = await knex(this.table).insert(user);

    user.id = id;

    user.password = undefined;

    return user;
  };

  public mailAlreadyExist = async (email: string): Promise<boolean | null> => {
    const isAlreadyCreate = await knex<Users>(this.table)
      .where({ email })
      .first();

    return !!isAlreadyCreate || null;
  };

  public userNameAlreadyExist = async (
    user_name: string,
  ): Promise<boolean | null> => {
    const isAlreadyCreate = await knex<Users>(this.table)
      .where({ user_name })
      .first();

    return !!isAlreadyCreate || null;
  };
}

export default UsersRepositories;
