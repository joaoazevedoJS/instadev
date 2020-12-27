import { getCustomRepository } from 'typeorm';

import FollowsRepositories from '../repositories/FollowsRepositories';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  follow_id: string;
}

class DeleteFollowService {
  public async execute({ user_id, follow_id }: Request): Promise<void> {
    const followsRepositories = getCustomRepository(FollowsRepositories);

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
