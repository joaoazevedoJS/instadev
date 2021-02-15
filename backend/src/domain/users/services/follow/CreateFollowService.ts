import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IFollows from '@domain/users/entities/IFollows';
import IFollowsRepository from '@domain/users/repositories/IFollowsRepository';

import IUsersRepository from '@domain/users/repositories/IUsersRepository';

import IFollowDTO from '@domain/users/dtos/IFollowDTO';

@injectable()
class CreateFollowService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('FollowsRepository')
    private followsRepository: IFollowsRepository,
  ) {}

  public async execute({ user_id, follow_id }: IFollowDTO): Promise<IFollows> {
    const user_follow = await this.usersRepository.findById(follow_id);

    if (!user_follow) {
      throw new AppError('User not found', 404);
    }

    const isAlreadyFollow = await this.followsRepository.findFollowIds(
      user_id,
      follow_id,
    );

    if (isAlreadyFollow) {
      throw new AppError('Is already follow');
    }

    const follow = await this.followsRepository.create({
      user_id,
      follow_id,
    });

    return follow;
  }
}

export default CreateFollowService;
