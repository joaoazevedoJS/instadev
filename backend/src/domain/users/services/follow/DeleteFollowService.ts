import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFollowDTO from '@domain/users/dtos/IFollowDTO';
import IUsersRepository from '@domain/users/repositories/IUsersRepository';
import IFollowsRepository from '@domain/users/repositories/IFollowsRepository';

@injectable()
class DeleteFollowService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,
  ) {}

  public async execute({ user_id, follow_id }: IFollowDTO): Promise<void> {
    const user_follow = await this.usersRepository.findById(follow_id);

    if (!user_follow) {
      throw new AppError('User not found', 404);
    }

    const follow = await this.followsRepository.findFollowIds(
      user_id,
      follow_id,
    );

    if (!follow) {
      throw new AppError('Follow not found', 404);
    }

    await this.followsRepository.delete(follow.id);
  }
}

export default DeleteFollowService;
