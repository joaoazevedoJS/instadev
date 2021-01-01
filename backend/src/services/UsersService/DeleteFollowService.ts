import { getCustomRepository, getRepository } from 'typeorm';

import FollowsRepositories from '../../repositories/FollowsRepositories';

import AppError from '../../errors/AppError';
import Users from '../../models/entities/Users';

interface Request {
  user_id: string;
  follow_id: string;
}

class DeleteFollowService {
  public async execute({ user_id, follow_id }: Request): Promise<void> {
    const followsRepositories = getCustomRepository(FollowsRepositories);
    const usersRepositories = getRepository(Users);

    const user = await usersRepositories.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users', 401);
    }

    const follow = await followsRepositories.findOne({
      where: { user_id, follow_id },
    });

    if (!follow) {
      throw new AppError('Follow not found', 404);
    }

    await followsRepositories.delete(follow.id);
  }
}

export default DeleteFollowService;
