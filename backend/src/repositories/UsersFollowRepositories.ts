// import UsersFollow from 'src/models/UsersFollow';
// import knex from '../database/connection';

interface Follows {
  following: number;
  followers: number;
}

class UsersFollowRepositories {
  private table = 'following';

  // public getCountFollowsByUser = async (user_id: number): Promise<Follows> => {
  //   const followers = await knex<UsersFollow>(this.table)
  //     .where({ following_id: user_id })
  //     .first()
  //     .count();

  //   const following = await knex<UsersFollow>(this.table)
  //     .where({ user_id })
  //     .count()
  //     .first();

  //   const follows = {
  //     following: Number(following),
  //     followers: Number(followers),
  //   };

  //   return follows;
  // };
}

export default UsersFollowRepositories;
