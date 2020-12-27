import { getCustomRepository, getRepository } from 'typeorm';

import Users from '../models/entities/Users';
import FollowsRepositories from '../repositories/FollowsRepositories';

import AppError from '../errors/AppError';

interface Response {
  user: Users;
  follows: {
    following: number;
    followers: number;
  };
}

class GetUserInfoByUsernameService {
  public async execute(user_name: string): Promise<Response> {
    const usersRepositories = getRepository(Users);
    const followRepositories = getCustomRepository(FollowsRepositories);

    const user = await usersRepositories.findOne({
      where: { user_name: user_name.trim() },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const follows = await followRepositories.getFollowsCountByUser(user.id);

    return { user, follows };
  }
}

export default GetUserInfoByUsernameService;
