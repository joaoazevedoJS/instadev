import { getCustomRepository, getRepository } from 'typeorm';

import FollowsRepositories from '../../repositories/FollowsRepositories';

import Follows from '../../models/entities/Follows';
import Users from '../../models/entities/Users';

import AppError from '../../errors/AppError';

interface Request {
  user_id: string;
  follow_id: string;
}

class CreateFollowService {
  public async execute({ user_id, follow_id }: Request): Promise<Follows> {
    const followsRepositories = getCustomRepository(FollowsRepositories);
    const usersRepositories = getRepository(Users);

    const user = await usersRepositories.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users', 401);
    }

    const user_follow = await usersRepositories.findOne(follow_id);

    if (!user_follow) {
      throw new AppError('User not found', 404);
    }

    const isAlreadyFollow = await followsRepositories.findOne({
      where: { follow_id, user_id },
    });

    if (isAlreadyFollow) {
      throw new AppError('Is already follow');
    }

    const follow = followsRepositories.create({
      user_id,
      follow_id,
    });

    await followsRepositories.save(follow);

    return follow;
  }
}

export default CreateFollowService;
